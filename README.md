# Address Application

This is a full-stack application for managing address data, consisting of a React frontend and a Node.js (Express.js) backend.

## Backend

The backend is built with Node.js, Express.js, and TypeScript, using Mongoose for MongoDB integration. It provides an API for adding and retrieving address components.

### Technologies

*   Node.js
*   Express.js
*   TypeScript
*   Mongoose (MongoDB ODM)
*   CORS
*   Dotenv

### API Endpoints

*   **`POST /api/address/create`**: Adds a new address to the database.
    *   **Request Body**: JSON object representing the address (e.g., `{"region": {"keyword": "...", "value": "..."}, ...}`).
    *   **Response**: `201 Created` on success, `400 Bad Request` on failure.

*   **`GET /api/addressPart`**: Retrieves address parts based on query parameters.
    *   **Request Query**: `address` (JSON string of address parts), `type` (string, e.g., "region", "district", "locality", "street", "house").
    *   **Response**: `200 OK` with an array of address parts, `404 Not Found` if no parts are found, `400 Bad Request` for unknown type.

### Running the Backend

The backend runs on port `3000`.

## Frontend

The frontend is a React application built with Vite, providing a user interface for uploading and managing address data. It interacts with the backend API to perform address validation and correction.

### Technologies

*   React
*   Vite
*   Axios (for API calls)
*   HTML/CSS

### Features

*   **File Upload**: Users can upload files containing address data.
*   **Address Display**: Displays uploaded address data in an interactive table (`InfoTable`).
*   **API Integration**: Communicates with the backend for adding and retrieving address information.

### Running the Frontend

The frontend typically runs on port `5173` during development, but is served by Nginx in the production Docker setup.

## Deployment with Docker Compose

This application can be easily deployed using Docker Compose, which orchestrates the frontend, backend, and MongoDB database services.

### Prerequisites

*   Docker and Docker Compose installed on your system.

### Setup and Run

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone <repository_url>
    cd AddressApp
    ```

2.  **Build and run the services**:

    ```bash
    docker-compose -f compose.yaml up --build -d
    ```

    *   `--build`: Builds the Docker images for the frontend and backend services.
    *   `-d`: Runs the services in detached mode (in the background).

3.  **Access the application**:

    *   **Frontend**: Open your web browser and navigate to `http://localhost` (or `http://127.0.0.1`).
    *   **Backend API**: The backend API will be accessible on `http://localhost:3000`.
    *   **MongoDB**: The MongoDB instance will be accessible on `mongodb://localhost:27017`.

### Stopping the application

To stop the running services, use the following command:

```bash
docker-compose -f compose.yaml down
```

This will stop and remove the containers, networks, and volumes created by `up`.


