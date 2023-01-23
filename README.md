# Pillpulse take home task

This project uses [Create React App](https://create-react-app.dev/) with TS enabled for client side and [node.js](https://nodejs.org/en/) for server side.

## Running the project

I used node `v19.4.0` and yarn `v1.22.19` to run the project.

- Go to `./server` folder and run `yarn install` and `yarn start`. This starts the server on port 3001
- In different terminal go to `./client` folder and run `yarn install` and `yarn start`. This starts the client on port 3000
- App is now available on `localhost:3000`

## Things to improve

- On the server side the drug information and interactions should be in the database. I'd probably use `knex` to handle migrations and query building with the DB. I'd use postgres db.
- Ensure that the expo server doesn't start accepting connections before reading csv data into memory is complete. Right now there's a small window where the expo server starts up and it hasn't finished reading the drug data into memory. During that small window the APi would return 0 drugs and no interactions.
