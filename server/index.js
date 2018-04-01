require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 3060;
app.listen(port, () => console.log(`Listening on port: ${port}`));