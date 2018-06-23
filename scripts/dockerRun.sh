#!/bin/sh

if "$h2" == "h2"; then
  docker run -d --name furkleindustries-homepage -p 80:3001 -p 443:3000 -v /etc/letsencrypt/live/furkleindustries.com/:/etc/furkleindustries-homepage/secrets/ furkleindustries-homepage
else
  docker run -d --name furkleindustries-homepage -p 80:3000 -v /etc/letsencrypt/live/furkleindustries.com/:/etc/furkleindustries-homepage/secrets/ furkleindustries-homepage
fi

echo 'dockerRun task complete.'