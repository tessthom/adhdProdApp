// external modules ----
import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

// local modules ----

// load .env variables ----
dotenv.config();

// program constants ----
const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

let db;

// wrapper fn for otherwise global vars ----
async function run() {
  try {
    // init a mongodb client
    const client = new MongoClient(uri, {
      // options object sets stable API version
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        depreciationErrors: true,
      }
    });

    await client.connect();
    db = client.db();
    
    app.listen(port);
  } catch (err) {
    console.dir(err);
  }
}

// init app ----
run();

// middleware  ----
app.use(express.urlencoded({ extended: true })); // configures body object on request object to make it easier to get form data 

// app.get + app.post endpoints ----
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tess' To Do</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">Hello, lil' ping pong brain!</h1>
        <form action="/add" method="POST">
          <div class="d-flex align-items-center">
            <label for="newTask" class="form-label mr-3">New task</label>
            <input autofocus autocomplete="off" class="form-control mr-3" name="newTask" id="newTask" type="text">
            <button class="btn btn-primary" type="submit">Add</button>
          </div>
        </form>

        <div>
          <h2>Tasks</h2>
          <ul class="list-group pb-5">
            
          </ul>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
      <script src="/browser.js"></script>

    </body>
    </html>
    `);
});

/**
 * ${tasks.map(item => {
              return `
                <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                  <span class="item-text">${item.name}</span>
                  <span class="item-text season">Urgency: ${item.urgency}</span>
                  <div>
                    <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button class="delete-me btn btn-danger btn-sm">Delete</button>
                  </div>
                </li>
              `;
            }).join('')}
 */

app.post('/add', async (req, res) => {
  await db.collection('tasks').insertOne({ description: req.body.newTask });
  res.send(`
    <div>
      <p>You added ${req.body.newTask}</p>
    </div>
    <a href="/">Back home</a>
    `);
});

// helper fns ----


