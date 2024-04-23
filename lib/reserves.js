const mysql = require("mysql2");

// Function to create a new reservation record
exports.add = function(db, obj, cb) {
    let sql = `INSERT INTO Sailing.Reserves (S_Id, B_Id, Day) VALUES (?, ?, ?)`;
    let values = [obj.S_Id, obj.B_Id, obj.Day];

    // Execute the SQL query to insert new reservation record
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

// Function to read reservation records
exports.display = function(db, cb) {
    // Updated SQL query to join Reserves, Sailors, and Boats tables
    let sql = `
        SELECT 
            r.S_Id, 
            s.S_name, 
            r.B_Id, 
            b.B_name, 
            r.Day
        FROM 
            Sailing.Reserves AS r
        INNER JOIN 
            Sailing.Sailors AS s ON r.S_Id = s.S_Id
        INNER JOIN 
            Sailing.Boats AS b ON r.B_Id = b.B_Id;
    `;

    // Execute the SQL query to fetch reservation records with additional details
    db.query(sql, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

// Function to delete reservation record
exports.delete = function(db, obj, cb) {
    let sql = `DELETE FROM Sailing.Reserves WHERE S_Id=? AND B_Id=?`; //Delete using both Ids
    let values = [obj.S_Id, obj.B_id];

    // Execute the SQL query to delete reservation record
    db.query(sql, values, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};