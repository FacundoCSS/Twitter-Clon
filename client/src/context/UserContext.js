import {useState, useContext, createContext} from 'react';
import {followUserRequest, getUserRequest, updateUserRequest} from '../api/user'

const context = createContext()

export const useUser = ()=>{
    const newContext = useContext(context)
    return newContext
}


const UserProvider = ({children})=>{

    const [user, setUser] = useState([])

    const getUser = async (id)=>{
        try {
            const res = await getUserRequest(id)
            // setUser(res)
            return(res)
        } catch (error) {
            Promise.reject(error)
        }
    }

    const updateUser = async (id, data)=>{
        try {
            const res = await updateUserRequest(id, data)
            setUser(res)
            return(res)
        } catch (error) {
            Promise.reject(error)
        }
    }

    const followUser = async (id)=>{
        try{
            const res = await followUserRequest(id)
            setUser(res)
            return(res)
        } catch (error) {
            Promise.reject(error)
        }
    }

    return (
        <context.Provider value={{
            user,
            getUser,
            updateUser,
            followUser
        }}>
            {children}
        </context.Provider>
    );
}

export default UserProvider