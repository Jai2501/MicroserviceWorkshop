# Module Review System

This project is a microservices-based system for managing module information and reviews. It consists of two separate services:

- **Module Service**: Manages course or module data.
- **Review Service**: Handles reviews associated with each module.
  The frontend is built with React, providing a user-friendly interface to interact with the microservices.

## Features

- **CRUD Operations**: Both services support create, read, update, and delete operations.
- **Microservice Architecture**: Each service is independently deployable, scalable, and maintainable.
- **Interactive Frontend**: Allows users to select modules from a dropdown, view reviews, and submit new reviews.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React, Axios for API calls
- **Styling**: CSS
- **Containerization**: Docker, Docker Compose

## Project Structure

- `services/backend/ModuleService/`: Contains all code for the module service.
- `services/backend/ReviewService/`: Contains all code for the review service.
- `services/frontend/`: Contains all React code for the frontend application.
- `services/docker-compose.yml`: Configuration file to orchestrate the services with Docker Compose.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

Alternatively

- Docker
- Docker Compose

### Installation (Assuming Node and npm)

1. **Clone the repository**

2. **Set up the Module Service**

   ```bash
   cd services/backend/ModuleService
   npm install
   npm start
   ```

3. **Set up the Review Service**

   ```bash
   cd services/backend/ReviewService
   npm install
   npm start
   ```

4. **Set up and run the Frontend**

   ```bash
   cd services/frontend
   npm install
   npm start
   ```

### Installation (Assuming Docker and Docker Compose)

1. **Clone the repository**

2. **Ensure Docker is running**

3. Navigate into `services` directory

```bash
cd services
```

4. **Run with Docker Compose**

```bash
docker-compose up --build
```

This command builds the images for the frontend and each service if they don't exist and starts the containers.

### Using the Application

- Open your web browser to `http://localhost:3000`.
- Select a module from the dropdown to view reviews.
- Submit new reviews using the form that appears after selecting a module.

### Service Registry

- Frontend: `http://localhost:3000`
- Module Service: `http://localhost:3001`
- Review Service: `http://localhost:3002`

## API Reference

### Module Service

- **GET `/modules`**: Fetch all modules.
- **POST `/modules`**: Add a new module.
- **PUT `/modules/:id`**: Update an existing module.
- **DELETE `/modules/:id`**: Delete a module.

#### Module Schema:

```JSON
{
    "id": "Unique ID for Module, eg: 1abc2 [String]",
    "code": "Module Code, eg: CS1101S [String]",
    "name": "Module Name, eg: Programming Methodology [String]"
}
```

### Review Service

- **GET `/reviews/module/:moduleId`**: Fetch all reviews for a module.
- **POST `/reviews`**: Add a new review.
- **PUT `/reviews/:id`**: Update an existing review.
- **DELETE `/reviews/:id`**: Delete a review.

#### Review Schema:

```JSON
  {
    "id": "Unique ID for Review, eg: 2bcd3 [String]",
    "moduleId": "Mapped to Module Id in Module Service, eg: 1abc2 [String]",
    "reviewer": "Name of Reviewer (Optional), eg: Jonathan [String]",
    "review": "Review, eg: Excellent introduction to programming. [String]",
    "rating": "Rating out of 5, eg: 5 [Int]"
  }
```
