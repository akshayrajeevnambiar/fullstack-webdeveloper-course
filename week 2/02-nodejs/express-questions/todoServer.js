/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// setting the working dir;
const workingDir = path.join(__dirname, "files/todos.json");

app.use(bodyParser.json());

const PORT = 3000;

// Creating two utility functions for reading and writting.
async function readFile() {
  try {
    const data = await fs.readFile(workingDir, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeFile(data) {
  try {
    await fs.writeFile(workingDir, JSON.stringify(data));
  } catch (err) {
    throw new Error(err);
  }
}

// GET /todos - Retrieve all todo items
app.get("/todos", async (req, res) => {
  try {
    const todos = await readFile();
    res.status(200).send(todos);
  } catch (err) {
    console.log(err);
  }
});

// GET /todos/:id - Retrieve a specific todo item by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const todos = await readFile();
    const todo = todos.find((t) => t.id === parseInt(req.params.id));

    if (todo) {
      res.status(200).send(todo);
    } else {
      res.status(500).send("ID Not Found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Listening to specified port
app.listen(PORT);

// POST /todos - Create a new todo item
app.post("/todos", async (req, res) => {
  try {
    const todos = await readFile();
    const newTodo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: req.body.completed || false,
      description: req.body.description || "",
    };
    todos.push(newTodo);
    await writeFile(todos);
    res.status(200).send("new todo created");
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT /todos/:id - Update an existing todo item by ID
app.put("/todos/:id", async (req, res) => {
  const todoId = parseInt(req.params.id);
  try {
    const todos = await readDataFromFile();
    const index = todos.findIndex((t) => t.id === todoId);
    if (index !== -1) {
      todos[index] = {
        id: todoId,
        title: req.body.title || todos[index].title,
        completed: req.body.completed || todos[index].completed,
        description: req.body.description || todos[index].description,
      };
      await writeDataToFile(todos);
      res.status(200).send("OK");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

// DELETE /todos/:id - Delete a todo item by ID
app.delete("/todos/:id", async (req, res) => {
  const todoId = parseInt(req.params.id);
  try {
    const todos = await readDataFromFile();
    const updatedTodos = todos.filter((t) => t.id !== todoId);
    if (updatedTodos.length < todos.length) {
      await writeDataToFile(updatedTodos);
      res.status(200).send("OK");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

module.exports = app;
