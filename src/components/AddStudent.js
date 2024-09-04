import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudents } from '../apiService';
import './AddStudent.css';

const AddStudent = () => {
  const [newStudent, setNewStudent] = useState({ name: '', contactDetails: '', address: '', pincode: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudents([newStudent]);
      alert('Student added successfully');
      navigate('/students'); // Redirect to the student list page
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  return (
    <div className="add-student-container">
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit} className="form-column">
        <input 
          type="text" 
          name="name" 
          value={newStudent.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required
        />
        <input 
          type="text" 
          name="contactDetails" 
          value={newStudent.contactDetails} 
          onChange={handleChange} 
          placeholder="Contact Details" 
          required
        />
        <input 
          type="text" 
          name="address" 
          value={newStudent.address} 
          onChange={handleChange} 
          placeholder="Address" 
          required
        />
        <input 
          type="text" 
          name="pincode" 
          value={newStudent.pincode} 
          onChange={handleChange} 
          placeholder="Pincode" 
          required
        />
        <button type="submit" className="btn-add-student">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
