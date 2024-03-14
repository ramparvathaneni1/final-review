In Progress:
- Create two branches: `main` and `solution`
- Add Selenium steps
- Shorten/summarize docker section


# Connect React frontend to Express API backend

We're going to continue where we left off with the [full stack review](https://git.generalassemb.ly/ModernEngineering/full-stack-react) lesson. The goal here is to add tests to our application then containerize it using docker.

## Start up your Node Express Backend

#### Initial Setup
1. Open your terminal.
2. To access the `mef` directory, please navigate to it from your home directory using the command `cd ~/mef`.
3. Fork the repository named [final-review](https://git.generalassemb.ly/ModernEngineering/final-review) on the
   GitHub website.
4. Click the "Fork" button in the upper right corner of the repository page. This will create a copy of the repository
   under your own GitHub account.
5. After forking, you'll have your own copy of the repository under your GitHub account.
    - Copy the URL of your forked repository, which will look
      like: `https://github.com/YourUsername/final-review.git`.
6. Now clone the repository using the SSH URL.
7. To change your current working directory to `express-todo-api` within the cloned `final-review` repository, you
   can use the following commands: `cd final-review/express-todo-api/`.
8. To reset the existing database using the `psql` command, you can use the following
   command: `psql -U postgres -d todo_app_db < db/todo.sql`.
9. To add dependencies to our project, use the `npm install` or `npm i` command.
10. To open the express-todo-api project in VSCode, use the command `code .`. After opening the project, you can initiate the server by opening the VS Code terminal and executing the command `npm run start`. The server is set up to listen on port `3001`.

NOTE: If you get a message that a port is in use, you can kill it with this
command: `sudo kill -9 $(sudo lsof -t -i:3000)`.

- Replace `3000` with the port number you want to stop.
- [Reference](https://tecadmin.net/kill-process-on-specific-port/)

## Setting up Testing for our API

#### What is Jest?
In this review walkthrough, we'll be going over Jest and how to set it up to your node/express backend. Jest is an open-source testing framework developed by Facebook. It is designed to be fast, easy to set up, and has built-in support for features like mocking, assertions, and code coverage. Jest is particularly well-suited for testing JavaScript applications, including Node.js backend code and front-end code written in frameworks like React.

#### Setup
1. Let's go into our `express-todo-api` directory
2. Install our testing dependencies: `npm install --save-dev jest supertest`
3. Within the `express-todo-api/package.json` file, let's update the `"test"` script to call `"jest"`:
```
"scripts": {
    "test": "jest",
    "start": "nodemon index.js"
},  
```
4. Create a new directory called `tests`: `mkdir tests`
5. Within the new directory, we'll make a new file called `index.test.js`: `touch tests/index.test.js`
6. In order for our tests to work, we'll need to require our dependencies:
```
// index.test.js

// DEPENDENCIES
const request = require("supertest");
const {app, server, pool} = require("../index");
```
7. In order for these imports to be successful, we'll have to export them from the `index.js` file. Replace `app.listen("3001", () => {});` with the following:
```
const server = () => app.listen("3001", () => {
});
server()

module.exports = {app, server, pool};
```
#### Testing Root Path
Back in the `index.test.js`, let's test the root path to verify that everything is configured correctly:
```
describe("Test the root path", () => {
    test('It should respond with "Hi There!"', async () => {
        const response = await request(app).get("/");
        expect(response.text).toBe("Hi There");
        expect(response.statusCode).toBe(200);
    });
});
```
In the terminal, run `npm run test` 
To halt the server: `CTRL+C`
![image info](./assets/test1.png)

At this point, we might not want to halt the server every time we create a new test. In order to prevent this, we're going to add a `afterAll` method at the bottom of the `index.test.js` file that'll close the server and the pool to resolve any asynchornous operations.
```
// Closing the connection allows Jest to exit successfully.
afterAll((done) => {
    server.close()
    pool.end()
    done()
});
```

#### GET All Todos
The next test we'll write is the GET all route. Add the following code to the index.test.js under the previous test that'll check the status of the GET route. If the status is 200, that means the call was successful. We'll then check to see if the length of the response payload is greater than zero. Once you've added the code, run `npm run test` in the terminal.
```
// GET all todos
describe("GET /api/todos", () => {
    it("should retrieve a list of todos", async () => {
        const response = await request(app)
            .get("/api/todos")
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });
});
```
#### POST (Create) a Todo
The next method we will work on is the POST, which will create a new todo. The goal is to be able to pass an object with new data, that will then be passed to our POST `/api/todos` url. The test will expect a successful status (201). At the end of this function, we're going to save the new todo object ID to a variable called `todoID`, that we will use for future tests.
```
// POST (create) new todo
let todoID;
describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
        const todoData = {title: "Test Todo", done: false};
        const response = await request(app)
            .post("/api/todos")
            .send(todoData)
            .expect(201);

        todoId = response.body.id;
    });
});
```

#### PUT (Update) a Todo
Now we want a test for our update functionality. Take a look at the code below, what is it doing? It's creating a new object `updatedTodoData` then sending that data to the endpoint as a PUT request. The ID that's being passed into the endpoint is the `todoID` that we declared in the POST test. If all goes well, we expect a 200 status code (typically updates should be 201, but the API has been setup to have a status code of 200). The test also expects a return of `Todo modified with ID: ${todoId}`.
```
describe("PUT /api/todos/:todoId", () => {
    it("should update a todo by ID", async () => {
        const updatedTodoData = {title: "Updated Todo", done: true};
        const response = await request(app)
            .put(`/api/todos/${todoId}`)
            .send(updatedTodoData)
            .expect(200); // 

        expect(response.body).toBe(`Todo modified with ID: ${todoId}`);
    });
});
```

####:muscle: You Do:
We currently don't have a test for each endpoint. The goal for the next 15 minutes is to write a test for...
<details>
<summary>the READ (GET by ID)</summary>
<br>

```
describe("GET /api/todos/:todoId", () => {
    it("should retrieve a specific todo by ID", async () => {
        const response = await request(app)
            .get(`/api/todos/${todoId}`)
            .expect(200);

        expect(response.body[0].id).toBe(todoId);
    });
});
```
</details>
<details>
<summary>the DELETE (DELETE by ID) endpoint</summary>
<br>

```
describe("DELETE /api/todos/:todoId", () => {
    it("should delete an existing todo", async () => {
        await request(app)
            .delete(`/api/todos/${todoId}`)
            .expect(204);

        // Verify that the todo has been deleted
        const response = await request(app)
            .get(`/api/todos/${todoId}`)
            .expect(200);

        expect(response.body.length).toBe(0);
    });
});
```
</details>

:eyes: *No peaking at the solutions until you're done!*
## Setting up Testing for our React Frontend

#### What is Selenium?
Selenium is a powerful tool commonly used for automating web browsers, particularly for testing web applications. React is a popular JavaScript library for building user interfaces, including web applications. Combining Selenium with a React application allows for automated testing of the user interface, ensuring functionality, performance, and user experience.

#### Setup
To begin, please open a new terminal window and navigate to the `/final-review/react-to-do-frontend-starter` folder: 

1. In the terminal, run `cd ~/mef/final-review/react-to-do-frontend-starter`
2. From this directory, open VS Code: `code .`
3. Open the terminal window within VSCode and execute the following commands:
    - Run `npm i` to install the necessary Node.js dependencies.
    - Now we want our testing framework. Install the selenium-webdriver package in your project: `npm install selenium-webdriver`
    - Make sure your backend is running if your app isn't working, then `npm run start` in your frontend directory to confirm the app is working. NOTE: If you get a message that a port is in use, you can kill it with this command: `sudo kill -9 $(sudo lsof -t -i:3000)`.
    - After you've verified that everything works, run `CTRL+C` in the terminal to stop running the React app.
4.  Create a `tests` folder in the directory: `mkdir tests`
5.  Within the new directory, make a subdirectory called `selenium`: `mkdir tests/selenium`, then create a new file called `App.test.js`: `touch tests/selenium/App.test.js` which will be our test file.

## Dependency Setup
In the `App.test.js` file, we'll need to import a couple modules from the testing framework along with the component(s) that we want to test. Take the code from below then paste it in the test file:
```
import { render, fireEvent } from '@testing-library/react';
import MyList from '../../src/MyList';
```

# Continue Selenium Here

####-----------------------------------------------------------

## Dockerize the Todo App (Note: shorten lesson, go over additional docker commands)

1. At this point, your Docker should be running and Postgres is turned off. If not, here are the steps:

    - To stop postgres in the VM run `sudo service postgresql stop`
        - We want to stop the VM version of Postgresql since Docker will also want to use the default port (5432)
    - To start Docker run `sudo service docker start`
    - Clone down this repo and open it in VS Code

## Create the Container network

We'll need to create a container network for your containers to talk to each other. Containers in the same container network can resolve each others' host names by their container name.

`sudo docker network create todo-app`

## Dockerfile the Postgres Database

1. Note that inside the `starter_todo_app`, we've renamed the node express todo app folder `backend`.

2. Inside the `starter_todo_app/backend/db` folder create a `Dockerfile` (from inside the `backend` folder): `touch db/Dockerfile`

    ```dockerfile
    FROM postgres
    # This is the image we'll use as the base

    ENV POSTGRES_PASSWORD docker
    # This is the password we'll define for the Docker Postgres instance

    ENV POSTGRES_DB todo_app_db
    # This is what we'll name the database inside the container

    COPY todo.sql /docker-entrypoint-initdb.d/
    # Copy the todo.sql file to the listed path in the container
    # This will create the todos table and add some todos
    ```

3. To build the image (if you're in the `backend/db` directory): `sudo docker build . -t db`. *Make sure you are running this build command from inside the `starter_todo_app/backend/db` folder.*

5. To run the image in a container: `sudo docker run -d --name db-container -p 5432:5432 --network todo-app db`

6. To confirm that we created the table and added some todos:

    - `sudo docker exec -it db-container psql todo_app_db -U postgres`
        - This will get us into the container and enter the `psql` shell
    - `SELECT * FROM todos;`
        - Get all the todos

    ![](./assets/docker-psql.png)

## Dockerfile for Node Express Backend

1. Note that inside the `starter_todo_app`, we've renamed the node express todo app folder `backend`.
1. Create a `Dockerfile` in the `starter_todo_app/backend` folder: `touch Dockerfile`

    ```dockerfile
    FROM node:alpine
    # This is the image we'll use as the base

    WORKDIR /usr/src/app
    # Create app directory

    COPY . .
    # Copy the app to the directory

    RUN npm install
    # Install dependencies

    EXPOSE 3001
    # The port we want the container to open (i.e. run on)

    CMD [ "npm", "run", "start" ]
    # The command to start the server inside the container
    ```

1. Add a `.dockerignore` file for files and folders we don't want to copy into the container:

    ```
    node_modules
    npm-debug.log
    ```

1. To build the image: `sudo docker build . -t backend`. *Make sure you are running this build command from inside the `starter_todo_app/backend` folder.*

    - The `-t` flag lets us tag the image so it's easier to find.

1. To run the image in a container: `sudo docker run -d --name backend-container -p 3001:3001 --network todo-app backend`

    - The `-p` flag defines the local port and the container port. These can be different.
    - The `--name` flag lets us name the container
    - `backend` is the name of the image
    - To view the server logs remove the `-d` flag (quite mode) after `docker run`

1. You can run `sudo docker ps` to check out the list of running containers.

2. Go to `localhost:3001` in the browser. We should see the same "Hi There" message as if running the app locally.

    ![](./assets/hi-there.png)


## Dockerfile for the React frontend

1. We've renamed the React todo app folder `frontend`.
1. Create a `Dockerfile`: `touch Dockerfile`

    ```dockerfile
    FROM node:alpine
    # This is the image we'll use as the base

    WORKDIR /usr/src/app
    # Create app directory

    COPY . .
    # Copy the app to the directory

    RUN npm install
    # Install dependencies

    EXPOSE 3000
    # The port we want the container to open (i.e. run on)

    CMD [ "npm", "run", "start" ]
    # The command to start the server inside the container
    ```

1. Add a `.dockerignore` file for files and folders we don't want to copy into the container:

    ```
    node_modules
    npm-debug.log
    ```

1. To build the image: `sudo docker build . -t frontend`. *Make sure you are running this build command from inside the `starter_todo_app/frontend` folder.*

    - The `-t` flag lets us tag the image so it's easier to find.

1. To run the image in a container: `sudo docker run -d --name frontend-container -p 3000:3000 --network todo-app frontend`

    - The `-p` flag defines the local port and the container port. These can be different.
    - The `--name` flag lets us name the container
    - `frontend` is the name of the image
    - To view the server logs remove the `-d` flag after `docker run`

2. Go to `localhost:3000` in the browser.

## Debugging: To stop and remove all containers

If you get a message saying that a container name is already taken, you may need to stop and remove a container or two.

1. Let's stop all running containers: `sudo docker stop $(sudo docker ps -a -q)`
2. `sudo docker ps -a` will show all stopped containers.
3. `sudo docker container prune` will remove all stopped containers.

    - If you're still having build issues it may help to remove all images: `sudo docker rmi $(sudo docker images -a -q)`

<!-- 1. Let's stop and remove all containers: `sudo docker rm -f $(sudo docker ps -a -q)` -->

<!--     - or try `sudo docker ps -aq | xargs docker stop | xargs docker rm` -->

#### Also, if you get a message that post 5432 is in use, make sure to stop the local Postgres engine in your VM: `sudo service postgresql stop`

## YOU DO

Now that you have your containers orchestrated, try your Postman collection requests again.