# NatureDefenders API Documentation

Welcome to the NatureDefenders API documentation. This guide provides details about the available API endpoints, their request and response formats, and other relevant information.

## Base URL

The base URL for all endpoints is: `https://nature-defenders.onrender.com/`

## User Registration

### `POST /users/register`

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "countryOfResidence": "USA",
  "selectedRole": "admin"
}
```

**Response:**

- Status: 201 Created
- Body:
  ```json
  {
    "_id": "user-id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "countryOfResidence": "USA",
    "role": "admin",
  }
  ```

## Project Creation (Admin Only)

### `POST /projects`

**Request Body:**

```json
{
  "companyName": "Company ABC",
  "companyLocation": "City, Country",
  "contactInformation": "contact@example.com",
  "teamBackground": "Background information about the team...",
  "projectTitle": "Title of the project",
  "projectDescription": "Detailed description of the project...",
  "preventiveMeasures": "Measures taken to prevent negative impact...",
  "habitationRestoration": "Plans for habitat restoration...",
  "pictureUrl": "http://example.com/project-picture.jpg"
}
```

**Response:**

- Status: 201 Created
- Body:
  ```json
  {
    "_id": "project-id",
    "name": "Project Name",
    // Other project fields
  }
  ```

## Get All Projects

### `GET /projects`

**Response:**

- Status: 200 OK
- Body: Array of project objects
  ```json
  [
    {
      "_id": "project-id-1",
      "name": "Project 1",
      // Other project fields
    },
    {
      "_id": "project-id-2",
      "name": "Project 2",
      // Other project fields
    }
    // ...
  ]
  ```

## Get Project by ID

### `GET /projects/:projectId`

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "_id": "project-id",
    "name": "Project Name",
    // Other project fields
  }
  ```

