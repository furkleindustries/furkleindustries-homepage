FROM node:8.9.4

EXPOSE 3000 3001

# Skips node_modules/ through .dockerignore, given that transferring modules to
# the container is actually significantly slower than downloading them.
COPY . /etc/furkleindustries-homepage/

WORKDIR /etc/furkleindustries-homepage/

RUN \
  npm install

CMD [ "npm", "run", "serve:ssr" ]