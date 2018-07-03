import 'babel-polyfill';
import path from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';
import config from './config';
import logging from './lib/logging';
import api from './routes';
import auth from './auth';

const app = express();

app.set('trust proxy', true);

// Add the request logger before anything else so that it can
// accurately log requests.
app.use(logging.requestLogger);

// Configure the session and session storage.
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: config.get('SECRET'),
  signed: true,
};

// In production use the App Engine Memcache instance to store session data,
// otherwise fallback to the default MemoryStore in development.
app.use(session(sessionConfig));

app.use(cookieParser());

// 몽고디비 연결 설정
mongoose.Promise = bluebird;

const db = mongoose.connection;

const MONGO_URL = config.get('MONGO_URL');
mongoose.connect(MONGO_URL, {
  reconnectTries: 100,
  reconnectInterval: 1000,
});

// open 이벤트는 1회만 일어난다.
db.once('open', () => {
  logging.info(`[MONGO DB URL] : ${MONGO_URL}`);
});
let dbTimer = null;
db.on('disconnected', () => {
  logging.error('MongoDB Disconnected');
  dbTimer = new Date().getTime();
});
db.on('reconnected', () => {
  let elapsed = 0;
  if (dbTimer !== null) {
    elapsed = new Date().getTime() - dbTimer;
  }
  logging.info(`MongoDB Reconnected, elalpsed: ${elapsed}`);
  dbTimer = null;
});
db.on('error', (error) => {
  logging.error(error);
  throw error;
});

// POST 연결을 위한 설정
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));

// API
app.use('/api', api);

app.use(express.static(path.join(__dirname, '../', 'public')));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client/build', 'index.html'));
  });
}

// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
app.use(logging.errorLogger);

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res) => {
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

// Start the server
const server = app.listen(config.get('PORT'), () => {
  const { port } = server.address();
  logging.info(`App listening on port ${port}`);
});

export default app;
