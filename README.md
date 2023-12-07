## Technical Challenge - Wanna Bet How Much?

Backend application simulation for the junior backend node technical position challenge.

### About the Project

Back-end application for a betting system of a betting house aiming to automate its processes to compete with these applications.

### Deployment link

- https://technical-challenge-bets-ff36.onrender.com

### Technologies Used

For this project, the following technologies were used:

- Node (versão 18.16.0);
- Express
- Typescript
- Prisma
- Postgres
- Jest and Supertest

### How it Works

This project is a REST API to serve a betting system for a betting house. It has three entities:

For the `participants` entity, two routes were created:

- POST `/participants`: Creates a participant with a given initial balance.

- GET `/participants`: Returns all participants and their respective balances.

For the `games` entity, four routes were created:

- POST `/games`: Creates a new game, with an initial score of 0x0 and marked as not finished.

- POST `/games/:id/finish`: Finish a game and consequently update all bets linked to it, calculating the amount won in each one and updating the balance of the winning participants.

- GET `/games`: - Returns all registered games.

- GET `/games/:id`: Returns the data for a game along with the bets linked to it.

For the `bets` entity, only one route was created:

- POST `/bets`: Register a bet from a participant in a specific game. The bet amount must be immediately deducted from the participant's balance.

### Some business rules

- If a participant with an initial balance of less than R$10.00 tries to register, error 401 will be returned.

- When trying to create a bet with a value greater than the participant's current balance, a 401 error is returned.

- When trying to create a bet on an already finished game, error 401 returns.

- If you try to finish a game that has already been finished, the 401 error returns.

### How to Run and Configure for Development and Testing

1. Clone this repository.

2. Install all dependencies with the command:

```bash
npm i

```

3. Configure the .env and .env.test files using the .env.example file.

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
- Add them to your local `.env` and `.env.test` files