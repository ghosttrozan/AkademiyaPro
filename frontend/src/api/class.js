import axios from 'axios';

const BASE_URL = import.meta.env;

export async function createClass(formData) {
  const token = localStorage.getItem('token');
  console.log(formData)
  const { className, yearlyFee, section, subjects, teacher} = formData;
  
  try {
    const response = await axios.post(
      BASE_URL.VITE_BASE_URL_REGISTER_CLASS,
      {  className, yearlyFee, section, subjects, teacher },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response : " , response)

    if(response.status === 200){
      return response?.data;
    }
    
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function getAllClasses() {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(
      BASE_URL.VITE_BASE_URL_ALL_CLASSES,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response : " , response)

    if(response.status === 200){
      return response?.data;
    }
    
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function getClassById(classId) {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      BASE_URL.VITE_BASE_URL_GET_CLASS_BY_ID+classId,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response : " , response)

    if(response.status === 200){
      return response?.data;
    }

  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function updateClass(classId, formData) {
  const token = localStorage.getItem('token');
  console.log(formData)
  const { className, monthlyFee, yearlyFee,  section, teacherId, teacherName, status } = formData;
  
  try {
    const response = await axios.put(
      `${BASE_URL.VITE_BASE_URL_UPDATE_CLASS_BY_ID}${classId}`,
      { className, yearlyFee, section, teacherId, teacherName, monthlyFee, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response : " , response)

    if(response.status === 200){
      return response?.data;
    }
    
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function deleteClass(classId) {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(
      `${BASE_URL.VITE_BASE_URL_DELETE_CLASS_BY_ID}${classId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response : " , response)

    if(response.status === 200){
      return response?.data;
    }
    
  } catch (error) {
    console.error(error);
    return error.response;
  }
}