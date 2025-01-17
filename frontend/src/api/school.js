import axios from 'axios';

const BASE_URL = import.meta.env;

export async function createSchool(profile) {
  const token = localStorage.getItem('token');
  const { name, tagline, phone, email, website, address, schoolType, establishedYear , logo } = profile;
  
  try {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tagLine", tagline);
    formData.append("contactNumber", phone);
    formData.append("schoolEmail", email);
    formData.append("schoolWebsite", website);
    formData.append("address", address);
    formData.append("schoolType", schoolType);
    formData.append("establishedYear", establishedYear);

    if (logo) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedTypes.includes(logo.type)) {
        formData.append("image", logo); // Append the logo file
      }
    }

    const response = await axios.post(
      BASE_URL.VITE_BASE_URL_SCHOOL_REGISTER,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
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
  const {
    name,
    tagline,
    phone,
    email,
    website,
    address,
    schoolType,
    establishedYear,
    logo,
  } = profile;

  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("tagLine", tagline);
    formData.append("contactNumber", phone);
    formData.append("schoolEmail", email);
    formData.append("schoolWebsite", website);
    formData.append("address", address);
    formData.append("schoolType", schoolType);
    formData.append("establishedYear", establishedYear);

    if (logo) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedTypes.includes(logo.type)) {
        formData.append("image", logo); // Append the logo file
      }
    }


    // Send the FormData with axios
    const response = await axios.put(
      `${BASE_URL.VITE_BASE_URL_SCHOOL_UPDATE}${_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error updating school:", error);
    return error;
  }
}
