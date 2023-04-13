import React, {useState} from 'react';
import {FaUserCircle} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext';
import {useNavigate, Link} from 'react-router-dom'
import CreateTweetForm from './CreateTweetForm';

import {FaTwitter, FaHome, FaRegBell, FaRegUser} from 'react-icons/fa'
import {FiMail} from 'react-icons/fi'
import {BsThreeDots} from 'react-icons/bs'


const NavBar = ({user}) => {

    const {logout} = useAuth()
    const navigate = useNavigate()
    const [isOpenLogout, setIsOpenLogout] = useState(false)
    const [isOpenTweeting, setIsOpenTweeting] = useState(false)

    if (isOpenLogout) {
        return(
            <div 
            className='absolute w-full h-full bg-gray-800 text-white flex items-center justify-center'
            >
                <div 
                className='w-[320px] h-[380px] p-[32px] rounded-2xl bg-black text-base flex flex-col justify-around items-center'
                >
                    <FaTwitter className='h-9 w-9 text-neutral-200'/>
                    <h2 className='font-semibold text-[22px]'>¿Quieres cerrar la sesión de Twitter?</h2>
                    Puedes volver a iniciar sesión en cualquier momento. Si solo quieres cambiar de cuenta, puedes hacerlo agregando una cuenta existente. 
                    <button
                    className='w-[256px] h-[44px] bg-white text-black text-center rounded-3xl font-semibold'
                    onClick={async ()=>{
                        setIsOpenLogout(false)
                        await logout()
                        navigate(0)
                    }}
                    >
                        Cerrar sesión
                    </button>
                    <button
                    className='w-[256px] h-[44px] border border-white text-center rounded-3xl font-semibold'
                    onClick={()=> setIsOpenLogout(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {isOpenTweeting 
            &&  <div className='fixed w-[100vw] min-h-[100vh] bg-sky-200/20 text-white flex items-start justify-center pt-[5vh]'>
                    
                    <div 
                    className='w-[600px] max-h-[80vh] p-[32px] rounded-2xl bg-black text-base'
                    >
                        <div
                        className='hover:cursor-pointer'
                        onClick={()=>setIsOpenTweeting(false)}
                        >
                            X
                        </div>
                        <CreateTweetForm/>
                    </div>
                </div>
            }
        <div className="h-[100vh] text-white flex flex-col justify-between items-end text-xl fixed top-0 left-0 w-[434px]">
            <nav>
                <ul className="w-[251px] px-[12px]">
                    <li>
                        <FaTwitter className='h-7 w-7 my-3 text-neutral-200'/>
                    </li>
                    <li className='font-semibold hover:bg-neutral-600 pl-3 rounded-3xl hover:cursor-pointer'>
                        <Link
                        to="/"
                        >
                            <FaHome className='h-7 w-7 my-3 mr-1 inline'/> Inicio
                        </Link>
                    </li>
                        
                    <li className='hover:bg-neutral-600 pl-3 rounded-3xl hover:cursor-pointer'>
                        <FaRegBell className='h-7 w-7 my-3 mr-3 inline'/> Notificaciones
                    </li>

                    <li className='hover:bg-neutral-600 pl-3 rounded-3xl hover:cursor-pointer'>
                        <FiMail className='h-7 w-7 my-3 mr-3 inline'/> Mensajes
                    </li>
                    <li 
                    className='hover:bg-neutral-600 pl-3 rounded-3xl hover:cursor-pointer my-3 mr-3'
                    onClick={()=>{
                        navigate(`/user/${user._id}`)
                        navigate(0)
                    }}
                    >
                            <FaRegUser className='h-7 w-7 my-3 mr-3 inline'/> Perfil
                    </li>

                    <li>
                        <button 
                        className=' my-3 bg-sky-500 rounded-3xl w-[225px] py-3'
                        onClick={()=>setIsOpenTweeting(true)}
                        >
                            Twittear
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="w-[255px] px-[12px]">
                <button 
                className='flex justify-around items-center my-3 hover:bg-neutral-600 rounded-3xl w-[225px] py-1 text-base'
                onClick={()=>setIsOpenLogout(true)}
                >        {
                            user?.image 
                            ? <div><img className='object-cover h-10 w-10 rounded-full' src={user.image.url} alt={user.image.public_id}/></div>
                            : <FaUserCircle className='h-10 w-10 text-neutral-800'/>
                        }
                        <p>
                            <div className='flex'>
                            {user ? <p className='font-semibold'>{user.username}</p> : "Usuario"}
                            {
                                user && <div className="text-[15px] pl-[5px] container text-neutral-600">
                                            {user?.user ? `@${user.user}`: `@${user.username}` }
                                        </div>
                            }
                            </div>
                            Cerrar sesión
                        </p>
                        <BsThreeDots/>
                </button>
            </div>
        </div>
        </div>
    );
};

export default NavBar;