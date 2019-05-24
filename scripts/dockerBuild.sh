#!/bin/sh

mkdir -p /etc/furkleindustries-homepage/secrets/ssl/ &&
cp /etc/letsencrypt/live/furkleindustries.com/privkey.pem /etc/furkleindustries-homepage/secrets/ssl &&
cp /etc/letsencrypt/live/furkleindustries.com/fullchain.pem /etc/furkleindustries-homepage/secrets/ssl &&
docker build -t furkleindustries-homepage /etc/furkleindustries-homepage &&
echo 'dockerBuild task complete.'