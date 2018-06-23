#!/bin/sh

cp /etc/letsencrypt/live/furkleindustries.com/privkey.pem /etc/furkleindustries-homepage/secrets/ &&
cp /etc/letsencrypt/live/furkleindustries.com/fullchain.pem /etc/furkleindustries-homepage/secrets/ &&
docker build -t furkleindustries-homepage /etc/furkleindustries-homepage && echo 'dockerBuild task complete.'