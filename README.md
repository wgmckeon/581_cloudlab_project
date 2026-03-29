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
```text
An app built using two images, node and redis alpine, that keeps track of the number of page visits.
The two containers in the docker network communicate using TCP.
```
