## Technical Challenge - Wanna Bet How Much?

Backend application simulation for the junior backend node technical position challenge.

### About the Project

Back-end application for a betting system of a betting house aiming to automate its processes to compete with these applications.

### Technologies Used

For this project, the following technologies were used:

- Node
- Express
- Typescript
- Prisma
- Postgres
- Jest and Supertest

### How it Works

This project is a REST API to serve a betting system for a betting house. It has three entities:

For the `participants` entity, two routes were created:

- POST `/participants`
- GET `/participants`

For the `games` entity, four routes were created:

- POST `/games`
- POST `/games/:id/finish`
- GET `/games`
- GET `/games/:id`

For the `bets` entity, only one route was created:

- POST `/bets`

### How to Run and Configure for Development and Testing

1. Clone this repository.

2. Install all dependencies with the command:

```bash
npm i

```

3. Configure the .env.development and .env.test files using the .env.example file.

4. Execute all scripts to run migrations:

```bash
npm run dev:migration:run
```
```bash
npm run test:migration:run
```
```bash
npm run dev:migration:generate
```
```bash
npm run test:migration:generate
```

5. Run the backend in a development environment:

```bash
npm run dev
```

## How to Run Tests
1. After configuring the .env.test file using the .env.example file and running the database migration script for the test environment, use the following command in the terminal:

```bash
npm run test
```

## Compiling and Starting for Production

```bash
npm run build
npm start
```

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:

- Add them to `.env.example` file
- Add them to your local `.env.development` and `.env.test` files