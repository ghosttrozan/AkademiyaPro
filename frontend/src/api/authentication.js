import axios from 'axios'

export async function principalProfile(id){

  try {
    const res = await axios.get(import.meta.env.VITE_BASE_URL_PRINCIPAL_PROFILE+id)

    return res.data.principal

  } catch (error) {
    return false
  }
}

export async function principalSignIn(email , password){

  const data = {
    email,
    password
  }

  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL_PRINCIPAL_LOGIN, data)

  if (res.status === 200){
      const {token , ...principalData} = res.data.principal
      localStorage.setItem('token' , res.data.principal.token)
      return principalData._id
  }
  } catch (error) {
    return false
  }
}

export async function verifyPrincipal(token){
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL_PRINCIPAL_VERIFY, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
      },
    });
    return response?.data?.principal
  } catch (error) {
    return false
  }
}

export async function createSchool(profile) {
  try {
    const token = localStorage.getItem('token');
    const {
      name,
      tagline,
      phone,
      email,
      website,
      address,
      schoolType,
      establishedYear,
    } = profile;

    const response = await axios.post(
      import.meta.env.VITE_BASE_URL_SCHOOL_REGISTER, // URL from environment variable
      {
        // Request body
        name,
        tagLine: tagline,
        contactNumber: phone,
        schoolEmail: email,
        schoolWebsite: website,
        address,
        schoolType,
        establishedYear,
      },
      {
        // Config object, including headers
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the Authorization header
        },
      }
    );

    if(response.status == 200){
      return response.data
    }

  } catch (error) {
    return false;
  }
}

export async function getSchool(token) {
  try {

    const response = await axios.get(
      import.meta.env.VITE_BASE_URL_SCHOOL_DETAILS, // URL from environment variable
      {
        // Config object, including headers
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the Authorization header
        },
      }
    );

    if(response.status == 200){
      return response.data
    }

  } catch (error) {
    return false;
  }
}