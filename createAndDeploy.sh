#!/bin/bash
cd backend
docker build -f Dockerfile.backend -t paulperigault/backend-container:latest .
cd ../frontend
docker build -f Dockerfile.frontend -t paulperigault/frontend-container:latest .
cd ../database
docker build -f Dockerfile.mongodb -t paulperigault/mongodb-container:latest .
cd ..
docker push paulperigault/backend-container:latest
docker push paulperigault/frontend-container:latest
docker push paulperigault/mongodb-container:latest