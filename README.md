# book-blog

[![CI](https://github.com/iamdanielcooper/book-blog/actions/workflows/main.yml/badge.svg)](https://github.com/iamdanielcooper/book-blog/actions/workflows/main.yml)

A blog where I can write about the books I'm reading.

## Usage

1. Clone this repo.
2. `cd book-blog`
3. `yarn install`
4. `npm start`
5. The app will now be running on localhost:3000

## Technologies Used.

-   Yarn (package management)
-   NodeJs
    -   Express
    -   Cors
    -   Nodemon
    -   Bcrypt
    -   Dotenv
    -   pg-promise

## References.

### Database Schemas.

-   [Users](https://dbdiagram.io/d/62e9a20ef31da965e8685cc5)

## User Stories.

As a user I can create an account with admin privileges.

## Endpoints.

```
POST /users/register
// Adds a new user to the database.

// Body

{
    "username": "string",
    "password": "string",
    "email": "string",
    "isAdmin": boolean
}

```

```
POST /database/init
// Tears down and re-inits the database.
```
