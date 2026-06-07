<<<<<<< HEAD
const express = require('express');

const app = express();
const port = process.env.PORT || 3002;

app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Dynamic User Page</h1>
    <p>Try <a href="/user/Ali">/user/Ali</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
=======
const express = require('express');

const app = express();
const port = process.env.PORT || 3002;

app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Dynamic User Page</h1>
    <p>Try <a href="/user/Ali">/user/Ali</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
});