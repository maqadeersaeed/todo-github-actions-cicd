# 📘 Todo App --- Full-Stack (Angular + Spring Boot) with Docker + GitHub CI/CD Support

A clean and modular full-stack **Todo Application** built with:

-   **Angular** (Frontend)
-   **Spring Boot** (Backend)
-   **PostgreSQL** (Local or Docker)
-   **Docker & Multi-Stage Dockerfiles**
-   **NGINX** as production frontend server

This repository demonstrates a complete end-to-end setup where the
frontend and backend can be built and deployed independently using
Docker.

------------------------------------------------------------------------

## 🗂 Project Structure

    todo-github-actions-cicd/
    │
    ├── docker/
    │   ├── frontend/
    │   │   ├── Dockerfile
    │   │   └── nginx.conf
    │   └── backend/
    │       └── Dockerfile
    │
    ├── todo-app-fe/     # Angular 20 Application (NO SSR ::: Docker image is Client Side Optimized Only)
    └── todo-app-be/     # Spring Boot (Java 21) Application

------------------------------------------------------------------------

## 🚀 Frontend (Angular + NGINX)

### **Build Image**

``` bash
docker build -f docker/frontend/Dockerfile -t todo-app-fe ./todo-app-fe
```

### **Run Container**

``` bash
docker run -d -p 80:80 --name todo-frontend todo-app-fe
```

App available at **http://localhost**

------------------------------------------------------------------------

## ⚙️ Backend (Spring Boot + Java 21)

### **Build Image**

``` bash
docker build -f docker/backend/Dockerfile -t todo-app-be ./todo-app-be
```

### **Run Backend Container**

``` bash
docker run -d   -p 8080:8080   -e DB_URL="jdbc:postgresql://host.docker.internal:5432/tododb"   --name todo-backend   todo-app-be
```

API available at **http://localhost:8080**

------------------------------------------------------------------------

## 🛢 Using Local PostgreSQL

Your container can reach your local machine DB via:

    host.docker.internal

Linux extra flag:

    --add-host=host.docker.internal:host-gateway

------------------------------------------------------------------------

## 🌐 CORS Support

CORS is enabled for:

-   http://localhost:4200
-   http://localhost
-   http://localhost:80

------------------------------------------------------------------------

## 🛠 Common Commands

### Stop containers

``` bash
docker stop todo-frontend todo-backend
```

### Remove containers

``` bash
docker rm todo-frontend todo-backend
```

### Logs

``` bash
docker logs -f todo-backend
```

------------------------------------------------------------------------
