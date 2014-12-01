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

ssh root@178.62.64.58 'bash -s' < sshProduction.sh

echo "All finished."
