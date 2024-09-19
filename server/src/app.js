require('dotenv').config();
const apiRouter = require('./routers/api.router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const express = require('express');
const createAdmin = require('./scripts/admin');

const app = express();
const { PORT } = process.env;

const corsConfig = {
  //! Access-Control-Allow-Origin
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
};

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')));

app.use(cors(corsConfig));
app.use(cookieParser());
createAdmin();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
