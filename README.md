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

## Dockerfile
~~~
//sets the base image, Node.js
FROM node:24

~~~
~~~
//creates the /app folder where all other commands will be executed
WORKDIR /app

~~~
~~~
//
RUN npm install

~~~
~~~
//
COPY . .

~~~
~~~
//
EXPOSE 8080

~~~
~~~
//
CMD ["node", "app.js"]

~~~


















