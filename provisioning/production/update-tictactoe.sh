docker kill tictactoe
docker rm tictactoe
docker pull gulli/tictactoe
docker run -p 80:8080 -d --name tictactoe -e "NODE_ENV=production" gulli/tictactoe
