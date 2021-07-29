const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParse = require('body-parser');

app.use(bodyParse.json());
app.use(express.json());

const studentList = [{
  firstName : "Yuvaraj",
  lastName : "A",
  rollNo : 4056,
  age : 28
},{
  firstName : "Karthic",
  lastName : "K",
  rollNo : 4550,
  age : 29
},{
  firstName : "Aswin",
  lastName : "K",
  rollNo : 4012,
  age : 22
}];

app.get('/api/students', (request, response) => {
  response.status(200).send(studentList);
});

const port = process.env.port || 8080;
http.listen(port, () => {
  console.log("Server is running on port 8080");
})
