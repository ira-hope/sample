const pool = require("../db/database");

// GET all students
const getStudents = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET one student by ID
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// CREATE student
const createStudent = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      program,
      year,
    } = req.body;

    // Required field validation
    if (!first_name || !last_name || !email || !program || !year) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Year validation
    if (year < 1 || year > 6) {
      return res.status(400).json({
        message: "Year must be between 1 and 6",
      });
    }

    const result = await pool.query(
      `INSERT INTO students
       (first_name, last_name, email, phone, program, year)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone,
        program,
        year,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// UPDATE student
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      first_name,
      last_name,
      email,
      phone,
      program,
      year,
    } = req.body;

    // Required field validation
    if (!first_name || !last_name || !email || !program || !year) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Year validation
    if (year < 1 || year > 6) {
      return res.status(400).json({
        message: "Year must be between 1 and 6",
      });
    }

    const result = await pool.query(
      `UPDATE students
       SET first_name = $1,
           last_name = $2,
           email = $3,
           phone = $4,
           program = $5,
           year = $6
       WHERE id = $7
       RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone,
        program,
        year,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE student
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};