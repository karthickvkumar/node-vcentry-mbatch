const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParse = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');

const DB_NAME = "student_db_test";
const TABLE_NAME = "student_info";

app.use(bodyParse.json());
app.use(express.json());

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : ''
});

connection.connect((error) => {
  if(error){
    console.log("Error in connecting the server", error);
    return;
  }

  console.log("Connected to the SQL Server");
})

app.post('/api/create/db', (request, response) => {
  
  connection.query(`CREATE DATABASE ${DB_NAME};`, (error, result) => {
    if(error){
      response.status(500).send({
        message : "Error in creating the Database", error});
      return;
    }

    const tableCreate = `USE ${DB_NAME}; CREATE TABLE ${TABLE_NAME} (first_name varchar(255), last_name varchar(255), age int(3), roll_no int(9))`;

    connection.query(tableCreate, (error, result) => {
      if(error){
        response.status(500).send({
          message : "Error in creating the Table", error});
        return;
      }

      response.status(200).send("Successfully created a new Database and Table");
    })
    
  });

})

app.get('/api/students', (request, response) => {

});

app.post('/api/student/create', (request, response) => {
  
});


app.put('/api/student/edit/:id', (request, response) => {
 
})

app.delete('/api/student/delete/:id', (request, response) => {
  
})


const port = process.env.port || 8080;
http.listen(port, () => {
  console.log("Server is running on port 8080");
})
