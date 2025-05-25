import axios from 'axios';

const BASE_URL = import.meta.env;

export const getAllStudents = async()=>{
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_URL_GET_ALL_STUDENTS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response)
    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const registerStudent = async(studentData)=> {
  console.log(studentData)
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Append all student data fields
    formData.append('firstName', studentData.firstName);
    formData.append('lastName', studentData.lastName);
    formData.append('gender', studentData.gender);
    formData.append('dateOfBirth', studentData.dateOfBirth);
    formData.append('classId', studentData.classId);
    formData.append('className', studentData.className);
    
    // Append nested objects as JSON strings
    formData.append('contactInfo', JSON.stringify(studentData.contactInfo));
    formData.append('parentContact', JSON.stringify(studentData.parentContact));
    formData.append('address', JSON.stringify(studentData.address));
    
    // Append the profile picture file
    if (studentData.profilePicFile) {
      formData.append('profilePic', profilePicFile);
    }

    const response = await fetch(BASE_URL.VITE_BASE_URL_REGISTER_STUDENT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const data = response

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register student');
    }

    return data;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;
  }
}


export const getStudentById = async (studentId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BASE_URL.VITE_BASE_URL_GET_STUDENT}${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.error('Error fetching student:', error);
    return false;
  }
};

export const updateStudent = async (studentId, studentData) => {
  const token = localStorage.getItem('token');
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Append all student data fields
    formData.append('firstName', studentData.firstName);
    formData.append('lastName', studentData.lastName);
    formData.append('gender', studentData.gender);
    formData.append('dateOfBirth', studentData.dateOfBirth);
    formData.append('classId', studentData.classId);
    formData.append('className', studentData.className);
    
    // Append nested objects as JSON strings
    formData.append('contactInfo', JSON.stringify(studentData.contactInfo));
    formData.append('parentContact', JSON.stringify(studentData.parentContact));
    formData.append('address', JSON.stringify(studentData.address));
    
    // Append the profile picture file if provided
    if (studentData.profilePicFile) {
      formData.append('profilePic', studentData.profilePicFile);
    }

    const response = await fetch(`${BASE_URL.VITE_BASE_URL_UPDATE_STUDENT}/${studentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to update student');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudentById = async (studentId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(`${BASE_URL.VITE_BASE_URL_DELETE_STUDENT}${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error deleting student:', error);
    return false;
  }
};

