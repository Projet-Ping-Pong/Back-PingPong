// require('dotenv').config();
// const express = require('express')
// const app = express()

// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () =>
//   console.log(`Listening on the port ${port}`)
// )

require ("./src/models/db");
require('dotenv').config();
const WebServer = require('./src/core/web-server');
const webServer = new WebServer();
webServer.start();
