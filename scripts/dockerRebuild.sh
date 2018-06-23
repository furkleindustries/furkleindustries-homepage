#! sh

dockerKill.sh && dockerClean.sh && dockerBuild.sh && dockerRun.sh && echo 'dockerRebuild task complete.'