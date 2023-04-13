import { useState, useEffect } from 'react';
import { Navigate} from 'react-router-dom';

import {useAuth} from '../context/AuthContext'
import NavBar from "../components/NavBar";

export const PrivateRoute = ({children}) => {

  const [token, setToken] = useState(false)

  const user = useAuth().state.user

    useEffect(()=>{
      const token = localStorage.getItem('token');
      setToken(token)
    },[])

    return (token === undefined || token === null || token === "" || token === 'undefined' || token === 'null') 
    ? <Navigate to="/auth" /> 
    : <div className=" min-h-screen flex">
        <div>
          {
            user ? <NavBar user={user}/> : <NavBar/>
          }
        </div>  
        <div className="w-[598px] min-h-screen border-x border-neutral-800 ml-[434px] text-white">
          {children}
        </div>
      </div>
}