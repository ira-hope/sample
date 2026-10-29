import { useEffect, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import "./App.css";

const API_URL = "http://localhost:5000/api/students";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  program: "",
  year: "",
};

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState("form");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ==============================
  // GET STUDENTS
  // ==============================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch students"
        );
      }

      setStudents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load students when application starts
  useEffect(() => {
    fetchStudents();
  }, []);

  // ==============================
  // ADD / UPDATE STUDENT
  // ==============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.program.trim() ||
      !formData.year
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      Number(formData.year) < 1 ||
      Number(formData.year) > 6
    ) {
      setError("Year must be between 1 and 6.");
      return;
    }

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: Number(formData.year),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      // Clear form
      setFormData(emptyForm);

      // Clear editing mode
      setEditingId(null);

      // Show success message
      setSuccess(
        editingId
          ? "Student updated successfully."
          : "Student registered successfully."
      );

      // Refresh students
      await fetchStudents();

      // Stay on form page
      setCurrentPage("form");

    } catch (error) {
      setError(error.message);
    }
  };

  // ==============================
  // EDIT STUDENT
  // ==============================

  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone: student.phone || "",
      program: student.program,
      year: student.year,
    });

    setError("");
    setSuccess("");

    // Go back to form
    setCurrentPage("form");

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // DELETE STUDENT
  // ==============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete student"
        );
      }

      setSuccess("Student deleted successfully.");

      await fetchStudents();

    } catch (error) {
      setError(error.message);
    }
  };

  // ==============================
  // CANCEL EDITING
  // ==============================

  const handleCancel = () => {
    setEditingId(null);

    setFormData(emptyForm);

    setError("");
    setSuccess("");

    setCurrentPage("form");
  };

  // ==============================
  // SEARCH
  // ==============================

  const filteredStudents = students.filter(
    (student) => {
      const search = searchTerm.toLowerCase();

      return (
        student.first_name
          .toLowerCase()
          .includes(search) ||

        student.last_name
          .toLowerCase()
          .includes(search) ||

        student.email
          .toLowerCase()
          .includes(search) ||

        student.program
          .toLowerCase()
          .includes(search)
      );
    }
  );

  // ==============================
  // FORM PAGE
  // ==============================

  const renderFormPage = () => {
    return (
      <div className="page-container">

        <div className="card form-card">

          <div className="page-header">
            <h1>
              {editingId
                ? "Update Student"
                : "Student Registration"}
            </h1>

            <p>
              {editingId
                ? "Update the student's information below."
                : "Register a new student by filling in the form below."}
            </p>
          </div>

          {error && (
            <div className="message error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="message success-message">
              {success}
            </div>
          )}

          <StudentForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={handleCancel}
          />

          <div className="navigation-section">

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setError("");
                setSuccess("");
                setCurrentPage("table");
              }}
            >
              View Registered Students
            </button>

          </div>

        </div>

      </div>
    );
  };

  // ==============================
  // TABLE PAGE
  // ==============================

  const renderTablePage = () => {
    return (
      <div className="page-container">

        <div className="card table-card">

          <div className="page-header table-header">

            <div>
              <h1>Student Records</h1>

              <p>
                View, search, update, or delete registered students.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setFormData(emptyForm);
                setEditingId(null);
                setError("");
                setSuccess("");
                setCurrentPage("form");
              }}
            >
              + Register Student
            </button>

          </div>

          {error && (
            <div className="message error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="message success-message">
              {success}
            </div>
          )}

          <div className="search-section">

            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, or program..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>

          {loading ? (
            <div className="loading">
              Loading students...
            </div>
          ) : (
            <StudentTable
              students={filteredStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          <div className="back-section">

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setSearchTerm("");
                setError("");
                setSuccess("");
                setCurrentPage("form");
              }}
            >
              ← Back to Registration
            </button>

          </div>

        </div>

      </div>
    );
  };

  // ==============================
  // MAIN RENDER
  // ==============================

  return (
    <div className="app">

      {currentPage === "form"
        ? renderFormPage()
        : renderTablePage()}

    </div>
  );
}

export default App;