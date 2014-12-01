#!/bin/bash

set -e

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


