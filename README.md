# Node.js Data ETL Assignment

This project consists of three services: a server, a client, and a data processor, along with a PostgreSQL database.

## Instructions

1. Install Node.js and PostgreSQL on your machine.
2. Clone this repository.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Run the database script `db.sql` to create the necessary table.
5. Start the server by running `node server.js`.
6. Run the client script to send events to the server: `node client.js`.
7. Run the data processor script to process events and update the database: `node data_processor.js`.

Ensure that the server is running before running the client and data processor scripts.

## Endpoints

- `POST /liveEvent`: Endpoint to receive live events from the client.
- `GET /userEvents/:userid`: Endpoint to retrieve user events from the database.

## Dependencies

- express
- body-parser
- axios