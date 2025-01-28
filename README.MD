Parco API challenge Documentation

Welcome to my Parco API challenge, a robust backend service built with Node.js and TypeScript. This API supports essential features such as authentication, authorization, and seamless interaction with a PostgreSQL database via TypeORM. With a focus on scalability and maintainability, it employs JWT-based authentication and bcrypt for secure password hashing.

This guide will walk you through the setup, configuration, and usage of the Parco API challenge, making it easy to get started.

This README provides details on how to set up, run, and test the API, as well as an overview of its architecture and dependencies.

Table of Contents

DOCKER

envs

Prerequisites

Installation

Configuration

Running the Application

Scripts

Testing

Linting

API Usage

Docker.
To pull the image hosted on dockerhub use the next commands in your terminal:
docker pull carloshdez02/parco-api:latest
 docker run --platform linux/arm64/v8 -it -p 3003:3000 -e DB_HOST=host.docker.internal --env-file .env carloshdez02/parco-api:latest
 Note: 3003 can be any port of your convinience

Envs.
The envs are not supposed to be loaded but we are making an exception here because i would like to cover all the edge cases to prevent  failure(xD)
#Database config variables
DB_HOST=host.docker.internal
DB_USER=postgres
DB_PASSWORD=mypassword
DB_NAME=parco
DB_PORT=5432
NODE_DEV=development

#Authentication config variables
JWT_SECRET=parcoAppSecret
JWT_EXPIRES_IN=1h

#Port where the app is running
PORT=3000



Dependencies
Before getting started, ensure you have the following tools installed:

Node.js (version 18.x or higher recommended)
npm (Node package manager)
PostgreSQL for database interaction
TypeScript for static type checking

Installation
Clone this repository to your local machine:
git clone https://github.com/CarlosHdez02/parco-api.git

Navigate to the project directory:
cd parco-api

Install dependencies:
npm install

Configuration
Ensure that you have a .env file in the root directory with the necessary environment variables configured:

#Database config variables
DB_HOST=localhost
DB_USER=youruser
DB_PASSWORD=yourpw
DB_NAME=parco
DB_PORT=5432
NODE_DEV=development

#Authentication config variables
JWT_SECRET=parcoAppSecret
JWT_EXPIRES_IN=1h

#Port where the app is running
PORT=3000

Running the Application
For development:
npm run dev

This will run the API in development mode, utilizing ts-node-dev for automatic reloading on changes.

For production:

First, compile the TypeScript code:

npm run tsc
Then, start the API:

npm start
The production build will be served on the port specified in your .env file (default is 3000).

Scripts
The following npm scripts are available:

npm run tsc: Compile the TypeScript code to JavaScript.
npm run dev: Run the application in development mode with hot-reloading.
npm start: Run the compiled JavaScript code in production mode.
npm run test: Run the tests using Jest.
npm run test:coverage: Run tests and generate a code coverage report.
npm run lint: Lint the project files using ESLint.
npm run lint:fix: Automatically fix linting issues in the project files.

Testing
This project uses Jest for unit and integration tests. To run the tests:

npm run test
For code coverage:

npm run test:coverage
Make sure you have a PostgreSQL instance running, and the database is properly configured in the .env file before running the tests.

npm jest testFile.test.ts
To run only one test file

Linting
The project uses ESLint with TypeScript support for code linting. To lint the code:

npm run lint
To automatically fix any fixable linting issues:

Dependencies
Core Dependencies
express: Web framework for Node.js.
jsonwebtoken: JWT-based authentication.
bcrypt: For password hashing and validation.
typeorm: ORM for interacting with PostgreSQL.
pg: PostgreSQL client for Node.js.
dotenv: To manage environment variables.

Development Dependencies
typescript: TypeScript compiler for type checking.
ts-node-dev: For development with hot-reloading.
jest: Testing framework.
supertest: HTTP assertions for testing.
eslint: Linter for JavaScript and TypeScript.
@types/...: Type definitions for various packages.

Usage
API Endpoints
The Parco API challenge provides several endpoints for interacting with resources using standard HTTP methods. Below is a description of the available HTTP methods, their routes, and example requests.

Note: Each endpoint should be send with its respective JWT, which can be required via user login, The process will be explained with more detail in the POST section
steps:
1. signup a user in endpoint: http://localhost:3000/api/v1/signup which will create an user 
2. Login the created user in endpoint: http://localhost:3000/api/v1/login with the provided email and password




1. POST /{resource}
Description: Authentication

Example: To Sign up and therefore creating a user, userType should be corporate, visitor or provider to have a succesfull response.
    Otherwise, you will recieve an error message according to whatever was missing on the request
    URL: http://localhost:3000/api/v1/signup

    JSON body:
    {
    "name":"oasvononoi",
    "email":"myUserCorporate@gmail.com",
    "password":"pardopw",
    "userType":"corporate"
}

Example: To login the signed up user and obtain the token to make requests inside our application
URL: http://localhost:3000/api/v1/login

JSON body:
{
  "email":"myUserVisitor@gmail.com",
    "password":"pardopw"
}

Example Response should be similar to this:
Note: The token will expire, whenever it expires, please send the request to this same endpoint and you will get a new token for that user
{
    "token": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2MTczNTMyLTkyMTEtNGZmOC1iOGM5LTBiYjBjYzA4YTNmMiIsInVzZXJUeXBlIjoidmlzaXRvciIsImlhdCI6MTczODAwOTAyMiwiZXhwIjoxNzM4MDEyNjIyfQ.GJuwRIWCql0zbyh-Lu2I9OzfYYBWKXQAqpDm1Z3vaic"
    }
}

Important Note: For each of the following endpoints, you must use the newly created token for authorization, if the token expires you can send a request
    to the login endpoint and add the new token on Authorization -> Auth Type:  Bearer Token. (Assuming you are using postman)

Example to create a new parkinglot
    URL: http://localhost:3000/api/v1/parkingLots
    JSON body:
                {
                    "name": "postman parking lot README",
                    "contact": "+521234567895",
                    "parkingType": "public", 
                    "spots": 600
                 }

Example response will be shaped like this:
                {
                    "name": "postman parking lot README",
                    "contact": "+521234567895",
                    "spots": 600,
                    "parkingType": "public",
                    "createdAt": "2025-01-27T21:26:36.057Z",
                    "id": "3aff489d-c431-4dd9-b6dd-a25816a476cf"
                }

Example: To update an existing parkinglot, this endpoint only allows the user to update the contact and spots field
    URL: http://localhost:3000/api/v1/parkingLots/{parkingLotId}
    URL used for example: http://localhost:3000/api/v1/parkingLots/79a61a06-eec6-4468-9123-9b5a8bbafbab
    JSON BODY:
            {
            "contact":"33333333",
            "spots":450
            }
    RESPONSE:
        {
        "name": "Central ",
        "contact": "33333333",
        "spots": 555,
        "parkingType": "private",
        "createdAt": "2025-01-27T22:02:33.796Z",
        "id": "79a61a06-eec6-4468-9123-9b5a8bbafbab"
    }

Example: To Checkin 
    URL:http://localhost:3000/api/v1/parkingLot/checkin

    JSON:
            {
            "parkingId": "79a61a06-eec6-4468-9123-9b5a8bbafbab"
            }
   The response will be give a response of success or error depending on the current user logged in and its privileges
   Example: We want to park in a parkinglot of type private and our current logged in user has the userType of Visitor we will get the following response:
    Reminder: this is our ser:
   JSON of our logged i user:
        {
            "email":"myUserVisitor@gmail.com",
            "password":"pardopw"
        }

    JSON we send to the checkin endpoint
    {
        "parkingId": "79a61a06-eec6-4468-9123-9b5a8bbafbab"
    }
    JSON of our parkinglot

        {
        "name": "Central ",
        "contact": "33333333",
        "spots": 555,
        "parkingType": "private",
        "createdAt": "2025-01-27T22:02:33.796Z",
        "id": "79a61a06-eec6-4468-9123-9b5a8bbafbab"
    }

   Response: {
    "errorCode": "ACCESS_DENIED",
    "message": "Para este tipo de estacionamiento private, solo los usuarios con tipo corporate pueden ingresar y este tipo de estacionamiento solo puede ser usado en días hábiles (lunes a viernes)"
    }

    JSON of our user
    {
        "name": "Juan",
        "email": "myUserVisitor@gmail.com",
        "password": "$2b$10$NVak7NcsUNALwByBmS8F1ef5QWiK7LZcmdo7SS4TODdeFauCScW7u",
        "userType": "visitor",
        "createdAt": "2025-01-26T21:32:54.783Z",
        "id": "36173532-9211-4ff8-b8c9-0bb0cc08a3f2"
    },

    Case where we try to access a public parking lot
    JSON of our checkin request:
    {
  "parkingId": "1caa8b74-0bae-4f41-9ed5-fd0381d1b943"
}
Response:
{
    "message": "Para este tipo de estacionamiento: public no hay validaciones. Cualquier persona puede entrar."
}


2. GET /{resource}
Description: Retrieve a list of resources from the API.

Example: To retrieve a list of parkinglor if using localhost:
 URL: http://localhost:3000/api/v1/parkingLots

Example Response: The response will show a response with the following structure whn it is populated with at least 1 parkinglot
{
    "totalItems": 1,
    "data": [
        {
            "name": "Central ",
            "contact": "33333333",
            "spots": 450,
            "parkingType": "private",
            "createdAt": "2025-01-26T20:10:12.585Z",
            "id": "79a61a06-eec6-4468-9123-9b5a8bbafbab"
        },
    ]
}

Example: To retrieve a list of parkinglots with limit query param if using localhost, query params can be used individually or together
URL: http://localhost:3000/api/v1/parkingLots?limit=2
    Example Response:
    {
        "totalItems": 17,
        "data": [
            {
                "name": "Central ",
                "contact": "33333333",
                "spots": 450,
                "parkingType": "private",
                "createdAt": "2025-01-26T20:10:12.585Z",
                "id": "79a61a06-eec6-4468-9123-9b5a8bbafbab"
            },
            {
                "name": "Central  courtesy",
                "contact": "1234567890",
                "spots": 50,
                "parkingType": "private",
                "createdAt": "2025-01-26T03:05:22.338Z",
                "id": "49984fe4-8eca-4df2-915c-827804062cc5"
            }
        ]
    }
Example: To retrieve a list of parkinglots with skip and limit query param if using localhost
URL: http://localhost:3000/api/v1/parkingLots?skip=3&limit=3
    {
    "totalItems": 17,
    "data": [
        {
            "name": "Central Parking",
            "contact": "1234567890",
            "spots": 50,
            "parkingType": "public",
            "createdAt": "2025-01-26T03:00:42.488Z",
            "id": "1caa8b74-0bae-4f41-9ed5-fd0381d1b943"
        },
        {
            "name": "Central update ",
            "contact": "1234567890",
            "spots": 52,
            "parkingType": "private",
            "createdAt": "2025-01-26T03:10:14.296Z",
            "id": "773c5fd2-4ed1-4f08-a667-8a159a84b90e"
        },
        {
            "name": "First parking lot test",
            "contact": "+5245678906231",
            "spots": 200,
            "parkingType": "public",
            "createdAt": "2025-01-27T04:07:46.801Z",
            "id": "5f957996-8da7-442f-a29a-ef29b0578479"
        }
    ]
}
Example: To retrieve a list of parkinglots with skip, limit and order query param if using localhost
Note: Order can be: ASC or DESC
URL: http://localhost:3000/api/v1/parkingLots?skip=3&limit=3&order=DESC

{
    "totalItems": 17,
    "data": [
        {
            "name": "Plaza post checkin fix3",
            "contact": "+521234567895",
            "spots": 200,
            "parkingType": "public",
            "createdAt": "2025-01-26T19:43:02.817Z",
            "id": "2730da7f-5dc9-4b14-a7c3-9f40f34436aa"
        },
        {
            "name": "Plaza post checkin fix1",
            "contact": "+521234567895",
            "spots": 960,
            "parkingType": "public",
            "createdAt": "2025-01-26T19:32:49.959Z",
            "id": "ed4662ef-ee40-4dba-901d-7790c0e1c711"
        },
        {
            "name": "Plaza post checkin fix",
            "contact": "+521234567890",
            "spots": 960,
            "parkingType": "courtesy",
            "createdAt": "2025-01-26T19:20:44.747Z",
            "id": "7222e96a-8d4f-4e13-a732-dc9a33414721"
        }
    ]
}

Example: To retrieve a specific parkinglot with its id
URL: http://localhost:3000/api/v1/parkingLots/{id}

Response:{
    "name": "First parking lot test",
    "contact": "+5245678906231",
    "spots": 200,
    "parkingType": "public",
    "createdAt": "2025-01-27T04:07:46.801Z",
    "id": "5f957996-8da7-442f-a29a-ef29b0578479"
}

Example to retrieve users if necessary: 
URL: http://localhost:3000/api/v1/users

Response: 
{
        "name": "peter",
        "email": "myUserProvider@gmail.com",
        "password": "$2b$10$CwuLEZR00CfhDP3TBjccsem0SA8s1GcwAH814jOqnc6DLn0LVaLBq",
        "userType": "provider",
        "createdAt": "2025-01-26T21:33:52.817Z",
        "id": "5de0451a-3ee4-47e0-82bc-17c247ee8754"
    },
    {
        "name": "khabib",
        "email": "myUserCorporate@gmail.com",
        "password": "$2b$10$9AyfchOSOazUlPv2DvLk6.zqtxBgBqf9qbIGaFzv/GncHFWiaz4p2",
        "userType": "corporate",
        "createdAt": "2025-01-26T21:34:27.756Z",
        "id": "d4b7bc1e-ae16-47e1-8a35-ca11506e759c"
    },

