const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const helmet = require('helmet');
const compression = require('compression');
const jwt = require('./backend/middlewares/jwt');
const publicRoute = require('./backend/config/jwt.json').publicRoute;

const app = express();
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));
app.use(compression());

// all requests will go through this middleware first
// app.use(function (req, res, next) {
//   if (req.method == "POST" && (publicRoute.indexOf(req.url) > -1)) {
//     // route normally
//     next();
//   } else {
//     // verify if the requester is authenticated
//     jwt.verifyToken(req, res, next);
//   }
// });

// Auto load all our routes into the application.
const normalizedPath = path.join(__dirname, "./backend/routes");
fs.readdirSync(normalizedPath).forEach(function(file) {
  app.use('/api/' + file.replace('.route.js', '/'), require('./backend/routes/' + file));
});

// When a route doesnt exist, show the requester this message
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3010';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Express server running on localhost:${port}`));
