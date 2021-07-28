const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParse = require('body-parser');

app.use(bodyParse.json());
app.use(express.json());



const port = process.env.port || 8080;
http.listen(port, () => {
  console.log("Server is running on port 8080");
})
