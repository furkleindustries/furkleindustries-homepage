#!/bin/sh

cp /etc/letsencrypt/live/furkleindustries.com/privkey.pem /etc/furkleindustries-homepage/secrets/ &&
cp /etc/letsencrypt/live/furkleindustries.com/fullchain.pem /etc/furkleindustries-homepage/secrets/ &&
docker run -d --name furkleindustries-homepage -p 80:3001 -p 443:3000 furkleindustries-homepage &&
echo 'dockerRun task complete.'