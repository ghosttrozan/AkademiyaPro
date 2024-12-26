# Principal Controller Documentation

This document provides an overview of the functions available in the `principalController.js` file, which is part of the School Management Software backend. The controller handles operations related to principals and teachers within the system.

## Functions

### 1. `registerPrincipal(req, res)`

Registers a new principal in the system.

- **Request Body:**

  - `name` (string): The name of the principal.
  - `email` (string): The email address of the principal.
  - `password` (string): The password for the principal's account.
  - `contactNumber` (string): The contact number of the principal.
  - `gender` (string): The gender of the principal.

- **Responses:**
  - `200 OK`: Principal created successfully with a JWT token.
  - `400 Bad Request`: Missing required fields or contact number already exists.
  - `500 Internal Server Error`: Error occurred during registration.

### 2. `getPrincipalById(req, res)`

Fetches a principal by their ID.

- **Request Parameters:**

  - `id` (string): The ID of the principal.

- **Responses:**
  - `200 OK`: Returns the principal's details.
  - `404 Not Found`: Principal not found.
  - `500 Internal Server Error`: Error occurred while fetching the principal.

### 3. `loginPrincipal(req, res)`

Logs in a principal using their contact number and password.

- **Request Body:**

  - `contactNumber` (string): The contact number of the principal.
  - `password` (string): The password for the principal's account.

- **Responses:**
  - `200 OK`: Logged in successfully with a JWT token.
  - `404 Not Found`: Principal not found.
  - `400 Bad Request`: Invalid credentials or error occurred during login.

### 4. `registerNewTeacher(req, res)`

Registers a new teacher under the principal's school.

- **Request Body:**

  - `firstName` (string): The first name of the teacher.
  - `lastName` (string): The last name of the teacher.
  - `email` (string): The email address of the teacher.
  - `contactNumber` (string): The contact number of the teacher.
  - `classAssigned` (string): The class assigned to the teacher.
  - `hireDate` (string): The hire date of the teacher.
  - `subjects` (array): The subjects taught by the teacher.
  - `designation` (string): The designation of the teacher.
  - `salary` (number): The salary of the teacher.
  - `address` (string): The address of the teacher.
  - `gender` (string): The gender of the teacher.
  - `password` (string): The password for the teacher's account.

- **Responses:**
  - `200 OK`: Teacher created successfully with a JWT token.
  - `400 Bad Request`: Missing required fields or contact number already exists.
  - `500 Internal Server Error`: Error occurred during registration.

### 5. `deleteTeacher(req, res)`

Deletes a teacher from the principal's school.

- **Request Parameters:**

  - `id` (string): The ID of the teacher to be deleted.

- **Responses:**
  - `200 OK`: Teacher deleted successfully.
  - `404 Not Found`: Teacher not found.
  - `403 Forbidden`: Unauthorized to delete the teacher.
  - `400 Bad Request`: Error occurred during deletion.

### 6. `getTeachers(req, res)`

Fetches all teachers under the principal's school.

- **Responses:**
  - `200 OK`: Returns a list of teachers.
  - `404 Not Found`: Principal not found.
  - `400 Bad Request`: Error occurred while fetching teachers.

### 7. `getTeachersById(req, res)`

Fetches a teacher by their ID.

- **Request Parameters:**

  - `id` (string): The ID of the teacher.

- **Responses:**
  - `200 OK`: Returns the teacher's details.
  - `404 Not Found`: Principal or teacher not found.
  - `400 Bad Request`: Error occurred while fetching the teacher.

## Exports

The following functions are exported from the `principalController.js` file:

- `registerPrincipal`
- `getPrincipalById`
- `loginPrincipal`
- `registerNewTeacher`
- `deleteTeacher`
- `getTeachers`
- `getTeachersById`

# School Controller Documentation

This document provides an overview of the `schoolController.js` file, which is part of the School Management Software backend. The controller handles operations related to school registration within the system.

## Functions

### 1. `registerSchool(req, res)`

Registers a new school in the system and associates it with a principal.

- **Request Body:**

  - `name` (string): The name of the school.
  - `address` (string): The address of the school.
  - `contactNumber` (string): The contact number of the school.
  - `establishedYear` (number, optional): The year the school was established.
  - `academicYears` (array): The academic years offered by the school.
  - `schoolEmail` (string): The email address of the school.
  - `schoolWebsite` (string, optional): The website of the school.

- **Responses:**
  - `200 OK`: School registered successfully with details of the new school.
  - `404 Not Found`: Missing required fields.
  - `400 Bad Request`: Invalid principal ID.
  - `500 Internal Server Error`: Error occurred during school registration.

## Exports

The following function is exported from the `schoolController.js` file:

- `registerSchool`
