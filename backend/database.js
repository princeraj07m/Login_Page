const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Your MySQL username
    password: "@Prince2427",  // Your MySQL password
    database: "auth_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database!");
}); 

module.exports = db;
