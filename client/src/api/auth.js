import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode';

function handleResponse({ user, token }) {
  localStorage.setItem('token', token);
  setAuthToken(token);
  return { user, token };
}

const getToken = ()=> {
    return localStorage.getItem('token');
}

const getUser = async (id)=>{

  try {
    const res = await axios.get(`/user/${id}`)
    // console.log(res.data)
    return res.data

  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  } 

}

const loadUserRequest = async ()=>{
  const token = getToken()

  if (!token) {
    return Promise.resolve({ user: null });
  }
  
  setAuthToken(token);

  const decoded = jwtDecode(token);

  const res = await getUser(decoded.id)
  return res

}

const registerUserRequest = async (userData)=>{
  const form = new FormData()

  try {
      for (let key in userData){
        form.append(key, userData[key])}

      const res = await axios.post('/signup', form,{
        headers: {
            "Content-Type": "multipart/form-data"
          }
      })
      console.log(res.data)
      return handleResponse(res.data)

  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }

}

const loginUserRequest = async (userData)=>{
  const form = new FormData()

  try {
      for (let key in userData){
        form.append(key, userData[key])}
      const res = await axios.post('/signin', form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
      })
      return handleResponse(res.data)

  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }


}

const logoutRequest = async()=>{
  try {
    const res = await axios.post('/logout',{
      headers: {
          "Content-Type": "multipart/form-data"
      }
    })
    console.log(res.data)
    return handleResponse(res.data)

  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
}

export {getToken, loadUserRequest, registerUserRequest, loginUserRequest, logoutRequest, getUser}