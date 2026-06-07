<<<<<<< HEAD
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const students = [
  'Ali Khan',
  'Ayesha Malik',
  'Usman Ahmed',
  'Zara Noor',
  'Hassan Raza'
];

app.get('/', (req, res) => {
  const studentItems = students
    .map((student) => `<li>${student}</li>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Student List</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background: #f4f7fb;
          color: #1f2937;
        }
        .card {
          max-width: 480px;
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }
        h1 {
          margin-top: 0;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Student List</h1>
        <p>Students stored in an array and displayed with HTML <li> elements.</p>
        <ul>
          ${studentItems}
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
=======
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const students = [
  'Ali Khan',
  'Ayesha Malik',
  'Usman Ahmed',
  'Zara Noor',
  'Hassan Raza'
];

app.get('/', (req, res) => {
  const studentItems = students
    .map((student) => `<li>${student}</li>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Student List</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background: #f4f7fb;
          color: #1f2937;
        }
        .card {
          max-width: 480px;
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }
        h1 {
          margin-top: 0;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Student List</h1>
        <p>Students stored in an array and displayed with HTML <li> elements.</p>
        <ul>
          ${studentItems}
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
});