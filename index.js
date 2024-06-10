require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.json())

const dsn = process.env.CONNECTION_STRING
console.log(`Using database ${dsn}`)
const port = process.env.PORT || 3333;


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () =>
 console.log(`Listening on the port ${port}`)
)
