const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParse = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');

const DB_NAME = "student_test_db";
const TABLE_NAME = "student_info";

app.use(bodyParse.json());
app.use(express.json());

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : DB_NAME
});

connection.connect((error) => {
  if(error){
    console.log("Error in connecting the server", error);
    return;
  }

  console.log("Connected to the SQL Server");
})

app.post('/api/create/table', (request, response) => {
  
  const tableCreate = `CREATE TABLE ${TABLE_NAME} (first_name varchar(255), last_name varchar(255), age int(3), roll_no int(9), id int NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))`;

  connection.query(tableCreate, (error, result) => {
    if(error){
      response.status(500).send({
        message : "Error in creating the Table", error});
      return;
    }

    response.status(200).send("Successfully created a new Table");
  });

})


app.post('/api/student/create', (request, response) => {
  const firstName = request.body.first_name;
  if(!firstName){
    response.status(400).send('Invalid or Missing Frist Name value');
    return;
  }
  const lastName = request.body.last_name;
  if(!lastName){
    response.status(400).send('Invalid or Missing Last Name value');
    return;
  }
  const rollNo = request.body.roll_no;
  if(!rollNo){
    response.status(400).send('Invalid or Missing Roll Number value');
    return;
  }
  const age = request.body.age;
  if(!rollNo){
    response.status(400).send('Invalid or Missing Age value');
    return;
  }

  const query = `INSERT INTO ${TABLE_NAME} (first_name, last_name, age, roll_no) VALUES ('${firstName}', '${lastName}', ${age}, ${rollNo});`

  connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
      return;
    }

    response.status(200).send("New user profile has been created successfully");
  })

});

app.get('/api/students', (request, response) => {
  const query = `SELECT * FROM ${TABLE_NAME};`;
  connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }

    response.status(200).send(result);
  })
});


app.put('/api/student/edit/:id', (request, response) => {
  const id = request.params.id;
  const firstName = request.body.first_name;
  if(!firstName){
    response.status(400).send('Invalid or Missing Frist Name value');
    return;
  }
  const lastName = request.body.last_name;
  if(!lastName){
    response.status(400).send('Invalid or Missing Last Name value');
    return;
  }
  const rollNo = request.body.roll_no;
  if(!rollNo){
    response.status(400).send('Invalid or Missing Roll Number value');
    return;
  }
  const age = request.body.age;
  if(!rollNo){
    response.status(400).send('Invalid or Missing Age value');
    return;
  }
  const query = `UPDATE ${TABLE_NAME} SET first_name='${firstName}', last_name='${lastName}', age=${age}, roll_no=${rollNo} WHERE id=${id}`

  connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }

    response.status(200).send("User has been updated Successfuly")
  })
})

app.delete('/api/student/delete/:id', (request, response) => {
  const id = request.params.id;
  const query = `DELETE FROM ${TABLE_NAME} WHERE id=${id}`

  connection.query(query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }

    response.status(200).send("User has been deleted Successfuly")
  });
})


const port = process.env.port || 8080;
http.listen(port, () => {
  console.log("Server is running on port 8080");
})
