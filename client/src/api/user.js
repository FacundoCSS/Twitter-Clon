import axios from 'axios'

const getUserRequest = async ( id ) => {

    try {
      const res = await axios.get(`/user/${id}`)
      return res.data
  
    } catch (error) {
      console.log(error)
      return Promise.reject(error);
    } 
  
  }

const updateUserRequest = async ( id, data ) => {
    
  try {
      const res = await axios.put(`/user/${id}`, data,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
      console.log(res)
      return res.data

    } catch (error) {
      console.log(error)
      return Promise.reject(error);
    } 
}

const followUserRequest = async (id) => {
  try {
    const res = await axios.put(`/follow/${id}`)
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
}

export {getUserRequest, updateUserRequest, followUserRequest}