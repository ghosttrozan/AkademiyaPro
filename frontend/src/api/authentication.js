import axios from 'axios'

async function principalSignIn(email , password){

  const data = {
    email,
    password
  }

  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL_PRINCIPAL_LOGIN, data)

  if (res.status === 200){
      localStorage.setItem('token' , res.data.principal.token)
    return true
  }
  } catch (error) {
    return false
  }
}

export default principalSignIn