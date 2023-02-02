require("dotenv").config();

const express = require('express');
const app = express();
// const cors = require('cors');
const PORT = process.env.PORT || 4000;
const URL = process.env.URL || "127.0.0.1";
const routeController = require('./controllers/routes');

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routeController);
app.use(express.static(`${__dirname}/public`));

app.listen(PORT, URL, () => console.log(`Server is running on ${URL}:${PORT}`));