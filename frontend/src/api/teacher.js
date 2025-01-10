import axios from 'axios';

const BASE_URL = import.meta.env;

export async function getAllTeacher(){
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL.VITE_BASE_URL_ALL_TEACHERS, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data.teachers;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch teachers');
  }
}

export async function registerTeacher(teacherData) {
  const { birthDate, contactNumber, designation, education, email, fatherName, 
    fullName, address, password, gender, salary, subjects } = teacherData;

  // Split fullName into firstName and lastName
  const {firstName, lastName} = fullName

  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    // Make the API call
    const response = await axios.post(
      BASE_URL.VITE_BASE_URL_REGISTER_TEACHER, 
      {
        birthDate, contactNumber, designation, education, email, fatherName,
        firstName, lastName, address, password, gender, salary, subjects
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log("Response:", response);

    if (response.status == 201) {
      return response?.data;
    }

  } catch (error) {
    console.error("Error:", error?.response?.data || error.message);
    return error?.response?.data || error.message
  }
}
