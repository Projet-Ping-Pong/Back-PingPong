require('dotenv').config();

const dsn = process.env.CONNECTION_STRING
console.log(`Using database ${dsn}`)
const port = process.env.PORT || 3333;
console.log(`Listening on the port ${port}`)
