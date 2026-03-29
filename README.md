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
```
An app built using two images, node.js and redis alpine, that keeps track of the number of page visits.
The two containers in the docker network communicate using TCP.
```

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


















