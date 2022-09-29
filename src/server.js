'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./auth/middleware/logger');

const authRoutes = require('./auth/routes/authRouter');
const v1Routes = require('./auth/routes/v1');

const app = express();

app.use(express.json());

app.use(logger);

app.use(authRoutes);

app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};