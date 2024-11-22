const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  
    database: 'sim_system'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.get('/students', (req, res) => {
    db.query('SELECT * FROM Students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/students', (req, res) => {
    const { first_name, last_name, date_of_birth, email, phone_number } = req.body;
    const query = `INSERT INTO Students (first_name, last_name, date_of_birth, email, phone_number) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [first_name, last_name, date_of_birth, email, phone_number], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Student added', studentId: results.insertId });
    });
});

app.get('/courses', (req, res) => {
    db.query('SELECT * FROM Courses', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/courses', (req, res) => {
    const { course_name, course_code, credits } = req.body;
    const query = `INSERT INTO Courses (course_name, course_code, credits) 
                   VALUES (?, ?, ?)`;
    db.query(query, [course_name, course_code, credits], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Course added', courseId: results.insertId });
    });
});

app.post('/enrollments', (req, res) => {
    const { student_id, course_id, grade } = req.body;
    const query = `INSERT INTO Enrollments (student_id, course_id, grade) 
                   VALUES (?, ?, ?)`;
    db.query(query, [student_id, course_id, grade], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Enrollment added', enrollmentId: results.insertId });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
