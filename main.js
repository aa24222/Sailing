/*
Name: Ayesha Afia
Date: 4/22/2024
Assignment 3

Description:
This assignment creates a MySQL database and tables within Nodejs code. 
The assignment involves through routes for sailors, boats, and reservations,
all within the Sailing Database. The application implements a full CRUD API 
to the Sailing database, allowing for table additions, deletions, updates, and display.

*/



//Import the mysql2 module
const mysql = require('mysql2');
//Add dependencies

const http = require("http");
const url = require("url");

//Import CRUD files for each table
const boatsCRUD = require("./lib/boats");
const sailorsCRUD = require("./lib/sailors");
const reservesCRUD = require("./lib/reserves");

//Initialize the connection object
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Afia6067?',
    database: 'Sailing'
    });

//Check the status of the connection
db.connect((err)=>{
    if (err) {
    return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
    });
    
//Create string to hold sql command for making database
let sql = "CREATE DATABASE IF NOT EXISTS Sailing;"

db.query(sql, (err)=>{
    if(err) throw err;
    console.log('Database created')
});

sql = "USE Sailing;"

db.query(sql, (err)=>{
    if(err) throw err;
    console.log('Using Sailing')
});

// Create Sailors table
 sql = `
  CREATE TABLE IF NOT EXISTS Sailing.Sailors (
    S_Id INT AUTO_INCREMENT PRIMARY KEY,
    S_name VARCHAR(20) NOT NULL,
    B_date DATE NOT NULL,
    Rate INT(5)
  )`;

db.query(sql, (err) => {
  if (err) throw err;
  console.log('Sailors table created');
});

// Create Boats table
sql = `
  CREATE TABLE IF NOT EXISTS Sailing.Boats (
    B_Id INT AUTO_INCREMENT PRIMARY KEY,
    B_name VARCHAR(20) NOT NULL,
    B_type VARCHAR(20) NOT NULL
  )`;

db.query(sql, (err) => {
  if (err) throw err;
  console.log('Boats table created');
});

// Create Reserves table with foreign keys
sql = `
  CREATE TABLE IF NOT EXISTS Sailing.Reserves (
    S_Id INT,
    B_Id INT,
    Day DATE NOT NULL,
    PRIMARY KEY (S_Id, B_Id, Day),
    FOREIGN KEY (S_Id) REFERENCES Sailors(S_Id),
    FOREIGN KEY (B_Id) REFERENCES Boats(B_Id)
  )`;

db.query(sql, (err) => {
  if (err) throw err;
  console.log('Reserves table created');
});


//Handle Post requests using CRUD operations from separate files
const handlePostRequest = (pathname, query, res) => {
    //Execute depending on path name
    switch (pathname) {
        case '/sailors':
        case '/sailors/':
            sailorsCRUD.add(db, query, handleCRUDResponse(res));
            break;
        case  '/boats':
        case '/boats/':
            boatsCRUD.add(db, query, handleCRUDResponse(res));
            break;
        case '/reserves':
        case '/reserves/':
            reservesCRUD.add(db, query, handleCRUDResponse(res));
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
};

//Handle Get requests using CRUD operations from separate files
const handleGetRequest = (pathname, res) => {
    switch (pathname) {
        case '/sailors':
        case '/sailors/':
            sailorsCRUD.display(db, handleCRUDResponseGet(res));
            break;
        case  '/boats': 
        case '/boats/':
            boatsCRUD.display(db, handleCRUDResponseGet(res));
            break;
        case '/reserves':
        case '/reserves/':
            reservesCRUD.display(db, handleCRUDResponseGet(res));
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
};

//Handle Put requests using CRUD operations from separate files
const handlePutRequest = (pathname, query, res) => {
    switch (pathname) {
        case '/sailors':
        case '/sailors/':
            sailorsCRUD.update(db, query, handleCRUDResponse(res));
            break;
        case  '/boats':
        case '/boats/':
            boatsCRUD.update(db, query, handleCRUDResponse(res));
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
};

//Handle Delete requests using CRUD operations from separate files
const handleDeleteRequest = (pathname, query, res) => {
    switch (pathname) {
        case '/sailors':
        case '/sailors/':
            sailorsCRUD.delete(db, query, handleCRUDResponse(res));
            break;
        case '/boats':
        case '/boats/':
            boatsCRUD.delete(db, query, handleCRUDResponse(res));
            break;
        case '/reserves':
        case '/reserves/':
            reservesCRUD.delete(db, query, handleCRUDResponse(res));
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
};



//Handler to display response
const handleCRUDResponse = (res) => {
    return (err, result) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Error');
        } else {
            //Show changes made to tables
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
            
        }
    };
};

//Handler for displaying formatted response
const handleCRUDResponseGet = (res) => {
    return (err, result) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Error');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
           
            //Format table rows into strings
            let formattedResult = '';
            result.forEach(row => {
                Object.keys(row).forEach(key => {
                    formattedResult += `  ${row[key]}  `;
                });
                formattedResult += '\n'; 
            });
            
            res.end(formattedResult);
        }
    };
};


//Handle requests
const handleRequest = (req, res) => {

    //Get pathname, query, and method
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const query = Object.fromEntries(searchParams.entries());
    const method = req.method.toUpperCase();

    //Execute operations
    switch (method) {
        case 'POST':
            handlePostRequest(pathname, query, res);
            break;
        case 'GET':
            handleGetRequest(pathname, res);
            break;
        case 'PUT':
            handlePutRequest(pathname, query, res);
            break;
        case 'DELETE':
            handleDeleteRequest(pathname, query, res);
            break;
        default:
            res.statusCode = 400;
            res.end('Invalid Method');
    }
};


//Turn on the server
const server = http.createServer(handleRequest);
server.listen(3034, () => {
    console.log('Server is running on port 3034');
});
