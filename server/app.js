const express = require("express")
const app = express()

const serverRoutes = require('./serverRoutes')

require('dotenv').config({path: './.env'});

serverRoutes(app);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("listen at PORT", PORT)
})