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
      console.log(principalData)
      localStorage.setItem('token', principalData.token.token);
      return principalData;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function verifyPrincipal() {
  try {
    const token = localStorage.getItem('token');
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

