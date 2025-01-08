import axios from 'axios';

const BASE_URL = import.meta.env;

export async function principalProfile(id) {
  try {
    const res = await axios.get(`${BASE_URL.VITE_BASE_URL_PRINCIPAL_PROFILE}${id}`);
    return res.data.principal;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function principalSignIn(email, password) {
  const data = { email, password };
  
  try {
    const res = await axios.post(BASE_URL.VITE_BASE_URL_PRINCIPAL_LOGIN, data);
    if (res.status === 200) {
      const principalData = res.data.principal;
      localStorage.setItem('token', principalData.token);
      return principalData;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function verifyPrincipal(token) {
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_URL_PRINCIPAL_VERIFY, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data?.principal;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updatePrincipal(data) {
  const { name, email, password, phone, gender } = data;
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.put(
      BASE_URL.VITE_BASE_URL_PRINCIPAL_UPDATE,
      { name, contactNumber: phone, email, password, gender },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      localStorage.setItem('token', response.data.principal.token);
      return response.data;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createSchool(profile) {
  const token = localStorage.getItem('token');
  const { name, tagline, phone, email, website, address, schoolType, establishedYear } = profile;
  
  try {
    const response = await axios.post(
      BASE_URL.VITE_BASE_URL_SCHOOL_REGISTER,
      { name, tagLine: tagline, contactNumber: phone, schoolEmail: email, schoolWebsite: website, address, schoolType, establishedYear },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getSchool(token) {
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_URL_SCHOOL_DETAILS, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    return false;
  }
}
