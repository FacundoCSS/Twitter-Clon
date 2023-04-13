import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = () => {
    const [state, setState] = useState('register')

    const onHandleNavClick = (e) => {
        setState(e.target.id)
    }

    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-neutral-900'>
            <div className="bg-black text-white rounded-xl h-[80vh] w-[600px]">
                <div className="h-[80%]">
                        {state === 'login' && <Login />}
                        {state === 'register' && <Register />}
                </div>
                <div className="flex items-center justify-center ">
                    {
                        state === 'login' 
                            ? <div
                            className='px-2 py-1 mx-2 my-3 text-[15px]'
                            >   
                                ¿No tienes una cuenta? 
                                <div 
                                id="register" 
                                onClick={onHandleNavClick}
                                className="text-sky-600 hover:cursor-pointer inline"
                                > Registrate
                                </div>
                            </div>
                            : <div
                            className='px-2 py-1 mx-2 my-3 text-[15px]'
                            >
                                ¿Ya tienes una cuenta? 
                                <div 
                                id="login" 
                                onClick={onHandleNavClick}
                                className="text-sky-600 hover:cursor-pointer inline"
                                > Inicia Sesión
                                </div>
                            </div>
                    }
                    


                </div>
            </div>
        </div>
        
    );
};

export default Auth;