# 581_cloudlab_project: Page View Counter

## Vision
```text
---------------------------------------
|            Docker network           |
|   -----------         -----------   |
|   | node.js |         |  alpine |   |
|   |  (web)  |---tcp---| (redis) |   |
|   |port 8080|         |port 6379|   |
|   -----|-----         -----------   |
|   container 1         container 2   |
|        |                            |
---------|-----------------------------
         |HTTP (port 8080)
         |-----browser
```
## Proposal

A two container application built using Node.js and Redis that keeps track of the number of page visits.
The two containers are on a private Docker bridge network. The web container exposes a port to the host, keeping Redis isolated within the private network. 

### Base Image Selection


| `node:24` |

The official Node.js (node:24) image was selected as the base because it is designed to be used as the foundation for web applications, and it allows for front and backend work to both be done in javascript. Node.js is also very lightweight, so it can handle processing multiple requests simultaniously without delay which is invaluable for real time applications. node:24 in particular was selected because it's the latest stable release.

| `redis:7-alpine` | 

The official Redis image on Alpine Linux is a small and efficient image which is perfect for handling simple value storage. It does not need any modifications beyond the default Redis configuration, making it simple and easy to use for this application.  


## Build Process
### Dockerfile
A line by line breakdown of `app/Dockerfile`:

1. Set the base image, `node:24`
~~~
FROM node:24
~~~
2. Set the /app folder as the working directory, where all other commands will be executed. If the folder does not exist, Docker will create it
~~~
WORKDIR /app
~~~
3. Copies package.json into /app
~~~
COPY package.json
~~~
4. Reads package.json to download the dependencies
~~~
RUN npm install
~~~
5. Copies project files into /app
~~~
COPY . .
~~~
6. Docker command to run Node.js set as PID 1
~~~
CMD ["node", "app.js"]
~~~


## Networking

Both containers are attached to a docker bridge network called docker-counter. A bridge network allows for the two containers to communicate with each other without using IP addresses, since IP addresses reset every time either container restarts. The bridge network supports automatic DNS resolution between containers, meaning it gives each container a set name which allows Node.js Express and Redis Alpine to easily communicate within docker-counter. Bridge networks are also internal and private, the containers can only interact with each other and are not exposed to any other information outside of the bridge network. 

Redis has no ports in `docker-compose.yml` to make it unreachable from outside the bridge network. The web container bridges the private network to the web. 


## Deployment on CloudLab
### Prerequisites

Ensure Docker and Docker Compose are installed correctly in your CloudLab environment:

```
docker --version
docker compose version
```

### Steps

1. SSH into you CloudLab experiment:

```
ssh <cloudlab-username>@<cloudlab-node-address>
```

2. Clone the repository
```
git clone 
```
3. 





