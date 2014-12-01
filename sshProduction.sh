echo "Stopping and removing all docker containers"

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo "Pulling new docker image"

docker pull olafurns/tictactoe

echo "Starting server"
docker run -p 80:8080 -d -e "NODE_ENV=production" olafurns/tictactoe

echo "Closing ssh"
exit
