// imports the express npm module
const express = require("express");

// imports the cors npm module
const cors = require("cors");

// imports the Pool object from the pg npm module, specifically
const Pool = require("pg").Pool;

// This creates a new connection to our database. Postgres listens on port 5432 by default
const pool = new Pool({
    user: "postgres",
    host: "db-container",
    database: "todo_app_db",
    password: "docker",
    port: 5432,
});

// Creates a new instance of express for our app
const app = express();

// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());

// We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());

// This route will return 'Hi There' when you go to localhost:3001/ in the browser
app.get("/", (req, res) => {
    res.send("Hi There");
});

app.get("/api/todos", (request, response) => {
    pool.query("SELECT * FROM todos ORDER BY id ASC", (error, results) => {
        if (error) throw error;
        console.log(results);
        response.status(200).json(results.rows);
    });
});

app.post("/api/todos", (request, response) => {
    const {title, done} = request.body;

    pool.query(
        "INSERT INTO todos (title, done) VALUES ($1, $2) RETURNING *",
        [title, done],
        (error, results) => {
            if (error) throw error;
            console.log(results);
            response.status(201).json(results.rows[0]);
        }
    );
});

app.get("/api/todos/:id", (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM todos WHERE id = $1", [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
});

app.delete("/api/todos/:id", (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM todos WHERE id = $1", [id], (error, results) => {
        if (error) throw error;
        response.status(204).send(`Todo deleted with ID: ${id}`);
    });
});

app.put("/api/todos/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const {title, done} = request.body;

    pool.query(
        "UPDATE todos SET title = $1, done = $2 WHERE id = $3",
        [title, done, id],
        (error, results) => {
            if (error) throw error;
            response.status(200).json(`Todo modified with ID: ${id}`);
        }
    );
});

// This tells the express application to listen for requests on port 3001
const server = app.listen("3001");

module.exports = {app, server, pool};