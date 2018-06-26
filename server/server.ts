// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode, } from '@angular/core';
import * as compression from 'compression';
import * as express from 'express';

import {
  readFile,
  readFileSync,
} from 'fs';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import {
  dirname,
  resolve,
} from 'path';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');

const enforce           = require('express-sslify');
const expressStaticGzip = require('express-static-gzip');
const serveFavicon      = require('serve-favicon');
const spdy              = require('spdy');

const dev = process.env.NODE_ENV === 'development';
console.log(`\nIs dev?   ${dev}`);

let h2 = process.env.h2 === 'h2';
console.log(`Is HTTP2? ${h2}\n`);

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const DIST_FOLDER = resolve(process.cwd(), 'dist');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
  ],
}));

app.set('view engine', 'html');
app.set('views', resolve(DIST_FOLDER, 'browser'));

app.use(compression());

/* Header middleware. */
app.use((req, res, next) => {
  /* Give the service worker root scope. */
  res.setHeader('Service-Worker-Allowed', '/');

  if (req.path === '/') {
    res.setHeader('Cache-Control', 'no-cache');
  } else if (req.path === '/static/sw.js') {
    /* Only cache the service worker for 5 seconds. */
    res.setHeader('Cache-Control', 'max-age=5');
  } else if (/\.(js|css)$/.test(req.path) ||
             /\.woff2?$/.test(req.path))
  {
    /* Cache all scripts, styles, and fonts for one year. */
    res.setHeader('Cache-Control', 'max-age=31536000');
  } 

  /* Deny HTTP entirely. */
  res.setHeader('Strict-Transport-Security',
                'max-age=31536000 ; includeSubDomains');

  /* Deny all iframing outside the site. */
  res.setHeader('X-Frame-Options', 'sameorigin');

  /* Block all detected XSS attacks entirely. */
  res.setHeader('X-XSS-Protection', '1; mode=block');

  /* Execute the next middleware. */
  next();
});

/* Favicon middleware. */
app.use(serveFavicon(resolve(DIST_FOLDER, 'browser', 'icons', 'favicon.ico')));

app.use('/fictions', express.static(resolve(DIST_FOLDER, 'browser', 'fictions')));
app.use('/images', express.static(resolve(DIST_FOLDER, 'browser', 'images')));

// Serve static files from dist/browser
app.get('*.*', express.static(resolve(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

/* Directory with keys in it. */
const letsEncryptDir = resolve(process.cwd(), 'secrets', 'ssl');

const getSpdyOptions = () => ({
  cert: readFileSync(resolve(letsEncryptDir, 'fullchain.pem')),
  key:  readFileSync(resolve(letsEncryptDir, 'privkey.pem')),
  spdy: {
    protocols: [
      'h2',
      'spdy/3.1',
      'spdy/3',
      'spdy/2',
      'http/1.1',
      'http/1.0',
    ],
  },
});

const PRIMARY_PORT   = 3000;
const SECONDARY_PORT = 3001;

const server = (() => {
  if (h2) {
    try {
      return spdy.createServer(getSpdyOptions(), app)
    } catch (e) {
      console.log(e);
      console.log('Generating HTTP(S|2) server failed. Falling back to HTTP.');
      h2 = null;
    }
  }

  return app;
})();

server.keepAliveTimeout = 5;

if (h2) {
  const second = express();
  second.use(enforce.HTTPS());
  second.listen(SECONDARY_PORT, (error) => {
    if (error) {
      throw error;
    }
  
    console.log(`HTTP->HTTPS redirector enabled @ http://localhost:${SECONDARY_PORT}.`);
  });
}
    
server.listen(PRIMARY_PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Listening @ http://localhost:${PRIMARY_PORT}.`);
});