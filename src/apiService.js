// apiService.js

const API_URL = 'http://localhost:8082/api/student';

// Function to add students
export const addStudents = async (students) => {
  try {
    const response = await fetch(`${API_URL}/save-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('Alca@gmail.com:123456'), // Replace with your credentials
      },
      body: JSON.stringify(students)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Function to get students
export const getStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/get-data`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('Alca@gmail.com:123456'), // Replace with your credentials
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// You can add other API functions here (update, delete, etc.)
export const updateStudents = async (students) => {
  try {
    const response = await fetch(`${API_URL}/update-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('Alca@gmail.com:123456'), 
      },
      body: JSON.stringify(students)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update student');
    }

    const responseText = await response.text();
    return responseText ? JSON.parse(responseText) : {}; // Return the parsed JSON response
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const deleteStudents = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete-data/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + btoa('Alca@gmail.com:123456'), // Replace with your credentials
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete student');
    }

    // Check if there is content to parse
    if (response.status === 204 || response.headers.get('Content-Length') === '0') {
      return; // No content to return
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
