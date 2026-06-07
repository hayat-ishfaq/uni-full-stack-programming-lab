<<<<<<< HEAD
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.get('/home', (req, res) => {
  res.send('Home Page -> Welcome Home');
});

app.get('/about', (req, res) => {
  res.send('About Page -> Learn More About Us');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page -> Get In Touch');
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Simple Message Routes</h1>
    <ul>
      <li><a href="/home">/home</a></li>
      <li><a href="/about">/about</a></li>
      <li><a href="/contact">/contact</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
=======
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.get('/home', (req, res) => {
  res.send('Home Page -> Welcome Home');
});

app.get('/about', (req, res) => {
  res.send('About Page -> Learn More About Us');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page -> Get In Touch');
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Simple Message Routes</h1>
    <ul>
      <li><a href="/home">/home</a></li>
      <li><a href="/about">/about</a></li>
      <li><a href="/contact">/contact</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
});