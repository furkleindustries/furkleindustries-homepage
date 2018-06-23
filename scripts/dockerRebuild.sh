#!/bin/sh

/etc/furkleindustries-homepage/dockerKill.sh && /etc/furkleindustries-homepage/dockerClean.sh && /etc/furkleindustries-homepage/dockerBuild.sh && /etc/furkleindustries-homepage/dockerRun.sh && echo 'dockerRebuild task complete.'