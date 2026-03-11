const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  course: String
});

const Student = mongoose.model("Student", studentSchema);

// Get all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add student
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Delete student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});
app.put("/students/:id", async (req,res)=>{
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});