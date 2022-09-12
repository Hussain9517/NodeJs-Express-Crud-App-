
// import express 
const express = require('express');
const app = express();

// Using Middleware 
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended:true}));

// importing student.js into app.js
const student = require('./student');

// Using student.js 
app.use('/api/v1/Student_Database', student);

// Allotting port
const port = 6100;

app.get('/api/v1/student_management_system', (req,res) => {
    res.send('<h1>Welcome to Student Management System!</h1>');
})

// Using Port, which we assigned! Start Serving
app.listen(port, function() {
    console.log(`Server is Running: 'Student nedb Database`);
})