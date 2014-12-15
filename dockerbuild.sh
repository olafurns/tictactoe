#!/bin/bash

export PATH=$PATH:/usr/local/bin

echo Cleaning...
rm -rf ./dist

echo Resolving npm and bower dependencies
npm install
bower install

echo Building app
grunt

rc=$?
if [[ $rc != 0 ]] ; then
  echo "Grunt build failed: " $rc
  exit $rc
fi

cp ./Dockerfile ./dist/
cd dist

npm install --production

echo Building docker image
docker build -t olafurns/tictactoe .


rc=$?
if [[ $rc != 0 ]] ; then
  echo "Docker image build failed with code:  " $rc ". Is docker daemon running?"
  exit $rc
fi

echo "Done"
