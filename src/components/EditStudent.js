import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { updateStudents } from '../apiService';

const EditStudent = ({ student }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [updatedStudent, setUpdatedStudent] = useState({
    id: '',
    name: '',
    contactDetails: '',
    address: '',
    pincode: '',
    ...student
  });

  useEffect(() => {
    if (student) {
      setUpdatedStudent(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateStudents([updatedStudent]);
  
      // Log response to check structure
      console.log('API response:', response);
  
      // Handle both success statuses (custom 'success' or HTTP status 200)
      if (response && (response.status === 'success' || response.status === 200 || response.ok)) {
        alert('Student updated successfully');
        navigate('/students'); // Redirect after successful update
      } else {
        console.error('Failed to update student:', response.message || 'Unknown error');
        alert(`Student updated successfully: ${response.message || 'Unknown error'}`);
        navigate('/students');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student');
    }
  };
  

  return (
    <div className="add-student-container">
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit} className="form-column">
        <input
          type="text"
          name="id"
          value={updatedStudent.id}
          onChange={handleChange}
          placeholder="id"
        />
        <input
          type="text"
          name="name"
          value={updatedStudent.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="contactDetails"
          value={updatedStudent.contactDetails}
          onChange={handleChange}
          placeholder="Contact Details"
        />
        <input
          type="text"
          name="address"
          value={updatedStudent.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="pincode"
          value={updatedStudent.pincode}
          onChange={handleChange}
          placeholder="Pincode"
        />
        <button type="submit" className="btn-add-student">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
