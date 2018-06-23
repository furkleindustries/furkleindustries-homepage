#!/bin/sh

docker run -d --name furkleindustries-homepage -p 80:3001 -p 443:3000 furkleindustries-homepage &&
echo 'dockerRun task complete.'