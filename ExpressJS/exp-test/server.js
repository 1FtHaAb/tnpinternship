const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.get("/afthab", (req, res) => {
    res.send("Hi Afthaab");
});

app.get("/user/:id", (req, res) => {
    res.send(`User ID is ${req.params.id}`);
});

let users = [];

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    users.push(req.body);

    res.json({
        message: "User added"
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});