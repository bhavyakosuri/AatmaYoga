const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bhavya@630401',
    database: 'formDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database!');
});

// Use cors middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const { firstname, lastname, email, mobile, subject, message } = req.body;

    if (!firstname || !lastname || !email || !mobile || !subject || !message) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO forms (firstname, lastname, email, mobile, subject, message) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [firstname, lastname, email, mobile, subject, message], (err, results) => {
        if (err) {
            console.error('Error saving form data:', err);
            return res.status(500).send('Error saving form data.');
        }
        res.status(200).send('Form data saved successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
