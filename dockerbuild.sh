#!/bin/bash

# export PATH=$PATH:/usr/local/bin

echo Cleaning...
rm -rf ./dist

echo Resolving npm and bower dependencies
npm install
bower install

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t gulli/tictactoe .

echo "Done"
