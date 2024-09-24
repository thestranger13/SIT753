#!/bin/bash

# Stop and remove existing container
docker stop vehicle-checker || true
docker rm vehicle-checker || true

# Run the new container
docker run -d --name vehicle-checker -p 4000:4000 vehicle-checker:v1.0.0