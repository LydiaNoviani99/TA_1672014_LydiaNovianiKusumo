const { firebase}  = require('./src/firebase')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// console.log(firebase);
const cron = require("node-cron");

cron.schedule("* * * * *", () => {
  console.log("running a task every 1 minute");
});