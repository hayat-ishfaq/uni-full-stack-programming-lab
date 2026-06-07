<<<<<<< HEAD
const express = require('express');

const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Simple HTML Page</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          color: #1f2937;
        }
        .page {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          max-width: 560px;
          width: calc(100% - 32px);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
        }
        h1 {
          margin-top: 0;
          font-size: 2rem;
        }
        p {
          line-height: 1.7;
          color: #4b5563;
        }
        ul {
          margin: 20px 0 0;
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <main class="page">
        <h1>Simple HTML Page</h1>
        <p>This page is rendered fully by Express using the root route.</p>
        <ul>
          <li>Title rendered in the page header</li>
          <li>Paragraph rendered in the body</li>
          <li>Simple list rendered with HTML items</li>
        </ul>
      </main>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
=======
const express = require('express');

const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Simple HTML Page</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          color: #1f2937;
        }
        .page {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          max-width: 560px;
          width: calc(100% - 32px);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
        }
        h1 {
          margin-top: 0;
          font-size: 2rem;
        }
        p {
          line-height: 1.7;
          color: #4b5563;
        }
        ul {
          margin: 20px 0 0;
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <main class="page">
        <h1>Simple HTML Page</h1>
        <p>This page is rendered fully by Express using the root route.</p>
        <ul>
          <li>Title rendered in the page header</li>
          <li>Paragraph rendered in the body</li>
          <li>Simple list rendered with HTML items</li>
        </ul>
      </main>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
});