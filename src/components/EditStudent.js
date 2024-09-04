import React, { useState, useEffect } from 'react';
import { updateStudents } from '../apiService'; 
const EditStudent = ({ student }) => {
  const [updatedStudent, setUpdatedStudent] = useState({
    id:'',
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
  
    console.log('Submitting updated student:', updatedStudent);
  
    try {
      const response = await updateStudents([updatedStudent]);
  
      console.log('Response data:', response);
  
      if (response && response.status === 'success') { // Check for your specific success condition
        alert('Student updated successfully');
      } else {
        console.error('Failed to update student:', response.message || 'Unknown error');
        alert(`Failed to update student: ${response.message || 'Unknown error'}`);
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
        /> <input
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
