#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo "Installing grunt"
npm install grunt

echo "Installing bower"
npm install bower

echo "Npm install"
npm install

echo "Bower install"
bower install


echo "Running grunt"
grunt


cp ./Dockerfile ./dist/
cd dist

echo "Done with preperations"
echo "Moving to docker build"

echo "Building docker"
docker build -t olafurns/tictactoe .

echo "Pushing docker image"
docker push olafurns/tictactoe

echo "Done with local"

echo "Connecting to production server.."

ssh root@178.62.64.58

echo "Stopping and removing all docker containers"

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo "Pulling new docker image"

docker pull olafurns/tictactoe

echo "Starting server"
docker run -p 80:8080 -d -e "NODE_ENV=production" olafurns/tictactoe

echo "Closing ssh"
exit
