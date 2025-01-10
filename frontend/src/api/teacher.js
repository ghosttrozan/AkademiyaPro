import axios from 'axios';

const BASE_URL = import.meta.env;

export async function getAllTeacher(){
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL.VITE_BASE_URL_ALL_TEACHERS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.teachers;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch teachers');
  }
}