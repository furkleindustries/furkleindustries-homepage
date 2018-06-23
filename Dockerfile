FROM node:8.9.4

EXPOSE 3000

# Skips node_modules/ through .dockerignore, given that transferring modules to
# the container is actually significantly slower than downloading them.
COPY . /etc/furkleindustries-homepage/

RUN mkdir -p /etc/furkleindustries-homepage/secrets/ssl/

COPY /etc/letsencrypt/live/furkleindustries.com/privkey.pem secrets/ssl/

COPY /etc/letsencrypt/live/furkleindustries.com/fullchain.pem secrets/ssl/

WORKDIR /etc/furkleindustries-homepage/

RUN \
  npm install

CMD [ "npm", "run", "start-prod-h2" ]