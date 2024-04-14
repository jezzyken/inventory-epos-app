const express = require("express")
const bodyParser = require('body-parser');

const app = express()

const serverRoutes = require('./serverRoutes')
const connectDB = require('./config/db');

require('dotenv').config({path: './.env'});

connectDB();

app.use(bodyParser.json());

serverRoutes(app);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("listen at PORT", PORT)
})