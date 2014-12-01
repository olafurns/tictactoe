#!/bin/bash

# export PATH=$PATH:/usr/local/bin

echo Linking node and nodejs
ln -s /usr/bin/nodejs /usr/bin/node

echo Cleaning...
rm -rf ./dist


echo Resolving npm and bower dependencies
npm install
bower install

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist

echo npm install
npm install --production

#echo Building docker image
#docker build -t olafurns/tictactoe .

echo "Done"
