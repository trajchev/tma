const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.send('Hello no World');
});

app.listen(3200);