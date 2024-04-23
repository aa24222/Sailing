const mysql = require("mysql2");

exports.add = function(db, obj, cb) {
    // Define the SQL query to insert a new sailor record
    let sql = `INSERT INTO Sailing.Sailors (S_name, B_date, Rate) VALUES (?, ?, ?)`;
    
    // Define the values to be inserted into the database
    let values = [obj.S_name, obj.B_date, obj.Rate];

    // Execute the SQL query with the provided database connection
    db.query(sql, values, function(err, result) {
        if (err) {
            // Call the callback function with the error if any
            cb(err);
        } else {
            // Call the callback function with the result
            cb(null, result);
        }
    });
};

exports.display = function(db, cb) {
    let sql = `SELECT * FROM Sailing.Sailors`;
    
    // Execute the SQL query to fetch sailor records
    db.query(sql, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

// Function to update sailor record
exports.update = function(db, obj, cb) {
    let sql = `UPDATE Sailing.Sailors SET S_name=?, B_date=?, Rate=? WHERE S_Id=?`; //must include these when updating
    let values = [obj.S_name, obj.B_date, obj.Rate, obj.S_Id];
    
    // Execute the SQL query to update sailor record
    db.query(sql, values, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

// Function to delete sailor record
exports.delete = function(db, obj, cb) {
    let sql = `DELETE FROM Sailing.Sailors WHERE S_Id=?`;//Delete based on Id
    let values = [obj.S_Id];
    
    // Execute the SQL query to delete sailor record
    db.query(sql, values, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};