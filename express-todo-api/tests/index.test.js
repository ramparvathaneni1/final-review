const request = require("supertest");
const { app, server, pool } = require("../index");

// Root Path
describe("Test the root path", () => {
  it('should respond with "Hi There!"', async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hi There");
    expect(response.statusCode).toBe(200);
  });
});

// GET all todos
describe("GET /api/todos", () => {
  it("should retrieve a list of todos", async () => {
    const response = await request(app).get("/api/todos").expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});

// POST (create) new todo
let todoId;
describe("POST /api/todos", () => {
  it("should create a new todo", async () => {
    const todoData = { title: "Test Todo", done: false };
    const response = await request(app)
      .post("/api/todos")
      .send(todoData)
      .expect(201);

    todoId = response.body.id;
  });
});

// PUT (update) a todo
describe("PUT /api/todos/:todoId", () => {
  it("should update a todo by ID", async () => {
    const updatedTodoData = { title: "Updated Todo", done: true };
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send(updatedTodoData)
      .expect(200);

    expect(response.body).toBe(`Todo modified with ID: ${todoId}`);
  });
});

// TODO GET todo by ID
describe("GET /api/todos/:id", () => {
  it("should retrieve details of todo", async () => {
    const response = await request(app).get(`/api/todos/${todoId}`).expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});

// TODO DELETE todo by ID
describe("DELETE /api/todos", () => {
  it("should delete a todo", async () => {
    await request(app).delete(`/api/todos/${todoId}`).expect(204);

    const response = await request(app).get(`/api/todos/${todoId}`).expect(200);

    expect(response.body.length).toBe(0);
  });
});

// Closing the connection allows Jest to exit successfully.
afterAll((done) => {
  server.close();
  pool.end();
  done();
});
