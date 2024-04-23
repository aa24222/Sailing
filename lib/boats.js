const mysql = require("mysql2");

// Function to create a new boat record
exports.add = function(db, obj, cb) {
    //Values to insert
    let sql = `INSERT INTO Sailing.Boats (B_name, B_type) VALUES (?, ?)`; 
    let values = [obj.B_name, obj.B_type];

    // Execute the SQL query to insert new boat record
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

// Function to read boat records
exports.display = function(db, cb) {
    let sql = `SELECT * FROM Sailing.Boats`;
    
    // Execute the SQL query to fetch boat records
    db.query(sql, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

// Function to update boat record
exports.update = function(db, obj, cb) {
    let sql = `UPDATE Sailing.Boats SET B_name=?, B_type=? WHERE B_Id=?`; //must include these when updating
    let values = [obj.B_name, obj.B_type, obj.B_Id];
    
    // Execute the SQL query to update boat record
    db.query(sql, values, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

// Function to delete boat record
exports.delete = function(db, obj, cb) {
    let sql = `DELETE FROM Sailing.Boats WHERE B_Id=?`; //Delete using Id
    let values = [obj.S_Id];
    // Execute the SQL query to delete boat record
    db.query(sql, values, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};