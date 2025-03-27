const Student = require('../models/Student');

const createStudent = async (req, res) => {
    try {
        const { name, phone, course, fees } = req.body;
        const student = new Student({ name, phone, course, fees });

        await student.save();
        res.status(201).json({ message: "Student Created Successfully", student });
    } catch (error) {
        console.error(`There is an error: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error(`There is an error: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

const singleStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ phone: req.params.phone }); 

        if (!student) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(`There is an error: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { name, phone, course, fees } = req.body;
        const updatedStudent = await Student.findOneAndUpdate(
            { phone: req.params.phone }, // Corrected query
            { name, phone, course, fees },
            { new: true } // To return the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(`There is an error: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findOneAndDelete({ phone: req.params.phone }); // Corrected query

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student Not Found" });
        }

        res.status(200).json({ message: "Student Deleted Successfully" });
    } catch (error) {
        console.error(`There is an error: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createStudent, getStudents, singleStudent, updateStudent, deleteStudent };