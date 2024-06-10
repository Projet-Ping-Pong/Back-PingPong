require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.json())

var dsn = process.env.CONNECTION_STRING
if (dsn === undefined) {
  const { env } = process;
  const read_base64_json = function (varName) {
    try {
      return JSON.parse(Buffer.from(env[varName], "base64").toString())
    } catch (err) {
      throw new Error(`no ${varName} environment variable`)
    }
  };
  const variables = read_base64_json('PLATFORM_VARIABLES')
  dsn = variables["CONNECTION_STRING"]
}

console.log(`Using database ${dsn}`)
const port = process.env.PORT || 3333;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () =>
  console.log(`Listening on the port ${port}`)
)
