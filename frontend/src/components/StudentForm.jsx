function StudentForm({
  formData,
  setFormData,
  onSubmit,
  editingId,
  onCancel,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="student-form"
    >

      <div className="form-row">

        <div className="form-group">
          <label htmlFor="first_name">
            First Name
          </label>

          <input
            id="first_name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">
            Last Name
          </label>

          <input
            id="last_name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone Number
          </label>

          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label htmlFor="program">
            Program
          </label>

          <input
            id="program"
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">
            Year
          </label>

          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">
              Select year
            </option>

            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
            <option value="5">Year 5</option>
            <option value="6">Year 6</option>
          </select>
        </div>

      </div>

      <div className="form-buttons">

        <button
          type="submit"
          className="primary-button submit-button"
        >
          {editingId
            ? "Update Student"
            : "Register Student"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default StudentForm;