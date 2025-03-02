// To run the server
// npm start 

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Prince2427",
    database: "auth_db",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: "Username already taken!" });
        }

        const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.query(insertQuery, [username, password], (err) => {
            if (err) {
                return res.json({ success: false, message: "Signup failed!" });
            }
            res.json({ success: true, message: "Signup successful!" });
        });
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const loginQuery = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(loginQuery, [username, password], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }

        if (results.length > 0) {
            return res.json({ success: true, message: "Login successful!" });
        } else {
            return res.json({ success: false, message: "Invalid username or password!" });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
