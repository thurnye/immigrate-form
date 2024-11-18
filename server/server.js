const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');

const route = require('./routes/routes');
const mongoose = require('mongoose');


const PORT = 8080;
const app = express();
const server = http.createServer(app);

// Body Parser Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));

app.use(logger('dev'));
app.use(express.json());

// STATIC FOLDER
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

// SETTING HEADER FOR ACCESS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, CREATE, DELETE, DESTROY');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(route);

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
 
mongoose.connect('mongodb://localhost/FormBuilder',)
  .then(() => {
    console.log('Database Connected..');
  })
  .catch(() => {
    console.log('Database Not Connected');
  });
