import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudents } from '../apiService';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`, { state: { student } });
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudents(id);
      setStudents(students.filter(student => student.id !== id));
      alert('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert(`Failed to delete student: ${error.message}`);
    }
  };
  
  

  return (
    <div className="student-list-container">
      <h1>Student List</h1>
      {message && <p className="message">{message}</p>} 
      <table className="student-list">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact Details</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.contactDetails}</td>
              <td>{student.address}</td>
              <td>{student.pincode}</td>
              <td className="action-buttons">
                <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
