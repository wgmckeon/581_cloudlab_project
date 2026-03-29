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

An app built using two images, node.js and redis alpine, that keeps track of the number of page visits.
The two containers in the docker network communicate using TCP.


## Build Process
### Dockerfile
~~~
//sets the base image, Node.js
FROM node:24
~~~
~~~
//creates the /app folder where all other commands will be executed
WORKDIR /app
~~~
~~~
//copies package.json into /app
COPY package.json
~~~
~~~
//reads package.json to download Express and Redis
RUN npm install
~~~
~~~
//copies project files into /app
COPY . .
~~~
~~~
//docker command to set node app.js as PID 1
CMD ["node", "app.js"]
~~~

### Base Image Selection

The official Node.js (node:24) image was selected as the base because it is designed to be used as the foundation for web applications, and it also allows for front and backend work to both be done in javascript. Node.js is also very lightweight, so it can handle processing multiple requests simultaniously without delay which is invaluable for real time applications. node:24 in particular was selected because it's the latest stable release.


### Networking

Both containers are attached to a docker bridge network called docker-counter. A bridge network allows for the two containers to communicate with each other without using IP addresses, since IP addresses reset every time either container restarts. The bridge network supports automatic DNS resolution between containers, meaning it gives each container a set name which allows Node.js Express and Redis Alpine to easily communicate within docker-counter. Bridge networks are also internal and private, the containers can only interact with each other and are not exposed to any other information outside of the bridge network. 



















