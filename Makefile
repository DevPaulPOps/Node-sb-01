.PHONY: build-and-run

build-and-run: build-mongodb run-mongodb build-backend run-backend build-frontend run-frontend

build-mongodb:
    docker build -t mongodb-container -f Dockerfile.mongodb .

run-mongodb:
    docker run -d --name mongodb-container -p 27017:27017 mongodb-container

build-backend:
    docker build -t backend-container -f Dockerfile.backend .

run-backend:
    docker run -d --name backend-container -p 3000:3000 backend-container

build-frontend:
    docker build -t frontend-container -f Dockerfile.frontend .

run-frontend:
    docker run -d --name frontend-container -p 80:80 frontend-container