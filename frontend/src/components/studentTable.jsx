function StudentTable({
  students,
  onEdit,
  onDelete,
}) {
  if (students.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          📋
        </div>

        <h3>No students found</h3>

        <p>
          There are no student records matching your search.
        </p>

      </div>
    );
  }

  return (
    <div className="table-wrapper">

      <table className="student-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Program</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student.id}>

              <td>
                {student.id}
              </td>

              <td className="student-name">
                {student.first_name}{" "}
                {student.last_name}
              </td>

              <td>
                {student.email}
              </td>

              <td>
                {student.phone || "-"}
              </td>

              <td>
                {student.program}
              </td>

              <td>
                Year {student.year}
              </td>

              <td>

                <div className="action-buttons">

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() =>
                      onEdit(student)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      onDelete(student.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StudentTable;