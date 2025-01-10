import axios from 'axios';

const BASE_URL = import.meta.env;

export async function createSchool(profile) {
  const token = localStorage.getItem('token');
  const { name, tagline, phone, email, website, address, schoolType, establishedYear } = profile;
  
  try {
    const response = await axios.post(
      BASE_URL.VITE_BASE_URL_SCHOOL_REGISTER,
      { name, tagLine: tagline, contactNumber: phone, schoolEmail: email, schoolWebsite: website, address, schoolType, establishedYear },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(response)
      return response;
    
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function getSchool() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_URL_SCHOOL_DETAILS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response)
    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateSchool(profile, _id) {
  const token = localStorage.getItem('token');
  const { name, tagline, phone, email, website, address, schoolType, establishedYear } = profile;
  
  try {
    const response = await axios.put(
      `${BASE_URL.VITE_BASE_URL_SCHOOL_UPDATE}${_id}`,
      { name, tagLine: tagline, contactNumber: phone, schoolEmail: email, schoolWebsite: website, address, schoolType, establishedYear },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error
  }
}