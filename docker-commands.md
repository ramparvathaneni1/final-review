# Docker Commands

| **Command** | **Description** |
|---|---|
| sudo service docker start | Starts the Docker service on your system. Docker must be running to manage containers and images. |
| sudo docker network create  | This Docker command creates a new network. Docker networks provide a way for Docker containers to communicate with each other directly and also with the outside world. They can be especially useful in microservices architecture. |
| sudo docker ps | Lists all currently running Docker containers: container ID, image used, when the container was created, the status, ports, and name. |
| sudo docker ps -a | Lists all Docker containers, including those that are currently running and those that have stopped. This is useful for seeing a complete history of containers on your system. |
| sudo docker stop  | This command will stop the container that is currently running. |
| sudo docker start  | Restarts a previously created and stopped Docker container identified by its container_id. |
| sudo docker rm -f  | This command forcefully removes a Docker container specified by its container_id. The -f flag stands for force, and it ensures that the container is stopped and then removed. |
| sudo docker rmi  | Removes a Docker image from your local storage. image_name is the name of the image you want to remove. Images are templates used to create containers and are stored locally once pulled from a registry like Docker Hub. |
| sudo docker inspect  | Displays detailed information in JSON format about a Docker image specified by image-name. It includes information like the image's layers, tags, and configuration details. |
| sudo docker logs  | This command fetches the logs of a Docker container. It's useful for debugging and understanding the behavior of applications running inside containers. |
| sudo docker network ls | Lists all networks created in Docker on your system. This can include default networks like bridge, host, and none, along with any custom networks you've created. |
| sudo docker network rm  | Removes a Docker network specified by network_name. Containers must be disconnected from the network before it can be removed. |