#!/bin/sh

/etc/furkleindustries-homepage/scripts/dockerClean.sh && /etc/furkleindustries-homepage/scripts/dockerBuild.sh && /etc/furkleindustries-homepage/scripts/dockerRun.sh && echo 'dockerUp task complete.'