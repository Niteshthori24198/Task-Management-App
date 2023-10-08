
# Task-Management-Api

Task Management API

This is a RESTful API for managing tasks. Users can create, retrieve, update, and delete tasks. It also includes optional features like authentication and rate limiting along with all user related crud operations.

## Table of Contents

- Getting Started
- Prerequisites
- Installation
- Usage
- Running the API
- Task structure
- Endpoints
- Authentication
- Error Handling
- Logging
- Rate Limiting


## Getting Started

Prerequisites
Before you begin, ensure that you have met the following requirements :
- Node.js
- MongoDB


## Clone this repository:

- git clone https://github.com/Niteshthori24198/Task-Management-App <br/>
- cd task-management-app

## Install dependencies:

npm install <br/>

Add a .env file and add below three varibales:-<br/>
mongoURL=your mongodb atlas url <br/>
 port=3001<br/>
SecretKey=""<br/>

- Running the APP: <br/>

    npm run server <br/>

    The API will be accessible at http://localhost:3001 by default.

    Deployment : https://task-management-app-niteshthori24198.vercel.app/

## Task Structure

Each task should have the following properties:<br/>

-   ID<br/>
-   Title<br/>
-   Description<br/>
-   CreationDate<br/>
-   Status (e.g., Pending, Completed, In Progress)


## API Endpoints :

POST /todotask/addnewtask: Add a new task to Database.<br/>
GET /todotask/getalltask: Retrieve a list of all tasks from Database.<br/>
GET /todotask/getonetask/:ID Retrieve a specific task by task-ID.<br/>
PUT /todotask/updatetask/:ID Update a specific task by task-ID.<br/>
DELETE /todotask/deletetask/:ID Delete a specific task by task-ID.<br/>


## Authentication Endpoints 

POST /user/register: Register a new user.<br/>
POST /user/login: Authenticate and login a user.<br/>
POST /user/logout: Logout a user from application.<br/>

## User Endpoints

GET /user/get: Get user information from Database.<br/>
PATCH /user/update : Update user informations. <br/>
DELETE /user/delete : Delete user Account. <br/>

## Authentication:

To use authentication, you must register and log in to manage tasks. Protected endpoints require authentication which is being handle by JWT authentication.

## Error Handling

Appropriate HTTP status codes and error messages will be returned in case of errors occurs during requests.

## Logging 

API requests and responses is being logged into a apilogs.txt file using which we can track all requests.

## Rate Limiting 

Rate limiting is applied to restrict the number of requests from clients within a specified time period so our server won't get overloaded by too many requests.

<h1 align="center">Thank You.💖</h1>