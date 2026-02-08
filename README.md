# 581_cloudlab_project

## Vision

```text
============================= HTTP =======================      
|  Static Web Server |  --------------->  |  Backend API |
|       (Nginx)      |  <---------------  |    (Python)  |
==========================================================
```
## Proposal

```text
This project will consist of two Docker containers, deployed on CloudLab.
The frontend will use an Nginx image to serve HTML and JavaScript content.
The backend will use a Python-based Docker image. It will implement a
REST API. The API will handle requests from the frontend and
return JSON responses over HTTP.
```
