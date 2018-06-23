#!/bin/sh

dockerKill.sh && dockerBuild.sh && dockerRun.sh && echo 'dockerUp task complete.'