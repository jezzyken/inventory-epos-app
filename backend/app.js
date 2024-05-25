const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

const serverRoutes = require('./serverRoutes')
const connectDB = require('./config/db');

require('dotenv').config({path: './.env'});

connectDB();

app.use(cors());

app.use(bodyParser.json(), cors());
app.options('*', cors());

serverRoutes(app);

app.use(express.static(__dirname + '/public'));

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
global.__basedir = __dirname;

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("listen at PORT", PORT)
})