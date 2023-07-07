const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./Routes');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

mongoose.connect('mongodb://0.0.0.0:27017/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
