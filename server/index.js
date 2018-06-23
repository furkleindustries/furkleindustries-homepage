const dev = process.env.NODE_ENV === 'development';
console.log(`\nIs dev?   ${dev}`);

const h2 = process.env.h2 === 'h2';
console.log(`\nIs HTTP2? ${h2}`); 

console.log('Loading dependencies.');

const express           = require('express');
const enforce           = require('express-sslify');
const expressStaticGzip = require('express-static-gzip');

const {
  readFile,
  readFileSync,
} = require('fs');

const {
  dirname,
  resolve,
} = require('path');

const serveFavicon               = require('serve-favicon');
const spdy                       = require('spdy');

console.log('Dependencies loaded.\n');

const projectPath = resolve(__dirname, '..');

const app = express();

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

  /* Deny all iframes/iframing of the site. */
  res.setHeader('X-Frame-Options', 'deny');

  /* Block all detected XSS attacks entirely. */
  res.setHeader('X-XSS-Protection', '1; mode=block');

  /* Execute the next middleware. */
  next();
});

/* Favicon middleware. */
//app.use(serveFavicon(resolve(imagesPath, 'favicon-96x96.png')));

/* Serve all files statically for now. */
app.use('/', express.static(resolve(projectPath, 'dist', 'furkleindustries-homepage')));

let isBuilt = false;

/* Directory with keys in it. Currently volumed with Docker from the host
 * filesystem. */
const letsEncryptDir = resolve(projectPath, 'secrets', 'furkleindustries.com');

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

const server = h2 ? spdy.createServer(getSpdyOptions(), app) : app;
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

  isBuilt = true;
  console.log(`Listening @ http://localhost:${PRIMARY_PORT}.`);
});