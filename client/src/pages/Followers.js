import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useUser } from "../context/UserContext";
import {AiOutlineArrowLeft, AiOutlineLoading3Quarters} from 'react-icons/ai'
import UserCard from '../components/UserCard';

const Followers = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState()
    const {getUser} = useUser()

    const callUser = async(userId)=>{
        const data = await getUser(userId)   
        setUser(data)
    }
    useEffect(()=>{  
        callUser(params.id)
    },[])

    if(!user){
        return (
            <div className='flex text-white border-b border-neutral-800 container py-[16px]'>
                <AiOutlineLoading3Quarters className='animate-spin h-5 w5 m-auto'/>
            </div>
        )
    }
    return (
        <div>
            <header className='container border-b border-neutral-800'>
                <div className='h-[53px]  pl-[16px] flex items-center justify-between'>
                    <div className='w-[56px] h-full flex items-center'>
                        <div 
                        onClick={()=>navigate(`/user/${params.id}`)}
                        className='w-[30px] h-[30px] hover:cursor-pointer hover:bg-neutral-800/50  rounded-2xl flex items-center justify-center'>
                            <AiOutlineArrowLeft className='h-5 w-5 text-neutral-200'/>
                        </div>
                    </div>
                    <div className="text-[20px] font-semibold container">
                        {user.username}
                    </div>
                </div>
                <div className="flex font-[arial] text-[15px] font-semibold">
                <div className="h-[56px] w-[50%] hover:bg-neutral-700/50 flex items-center justify-center hover:cursor-pointer"
                    >
                        <h2 className="text-neutral-200">Seguidores</h2>
                    </div>
                    <div className='h-[56px] w-[50%] hover:bg-neutral-700/50 flex items-center justify-center hover:cursor-pointer'
                    onClick={()=>navigate(`/${params.id}/following`)}
                    >
                        <h2 className="text-neutral-700">Siguiendo</h2>
                    </div>
                    
                </div>
            </header>

                {
                            
                            <div className="flex flex-col-reverse flex-nowrap text-white">
                                {
                                user?.followers
                                    ? user.followers.map (id => { 

                                        return  <div key={id} className="container m-auto">
                                                    <UserCard id={id}/>
                                                </div>
                                    })
                                    : <div>A este usuario no lo sigue nadie</div>
                                }
                            </div>
                            
                    }
        </div>
    );
};

export default Followers;