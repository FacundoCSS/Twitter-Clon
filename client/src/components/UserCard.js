import React, {useEffect, useState} from 'react';
import { useUser } from "../context/UserContext";
import {useNavigate} from 'react-router-dom'

import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {FaUserCircle} from 'react-icons/fa'

const UserCard = ({id}) => {

    const navigate = useNavigate()
    
    const {getUser, followUser} = useUser()

    const [user, setUser] = useState()
    const [isFollowing, setIsFollowing] =useState(true)

    const callUser = async(userId)=>{
        const data = await getUser(userId)   
        setUser(data)
    }
    useEffect(()=>{  
        callUser(id)
    },[])

    if(!user){
        return (
            <div className='flex text-white border-b border-neutral-800 container py-[16px]'>
                <AiOutlineLoading3Quarters className='animate-spin h-5 w5 m-auto'/>
            </div>
        )
    }

    return (
        <div className='flex border-b border-neutral-800 container px-[16px] hover:bg-neutral-800/30'>
            <div className='h-full flex py-[12px] justify-center w-[70px] mr-[12px]'>
                {user?.image 
                    ? <div><img className='object-cover h-12 w-12 rounded-full' src={user.image.url} alt={user.image.public_id}/></div> 
                    :<FaUserCircle className='h-12 w-12 text-neutral-800'/>
                }
            </div>
            <div className='container'>
                <div className='py-[12px]'>
                    <div
                    onClick={()=>navigate(`/user/${user._id}`)}
                    className=' font-semibold font-[arial] hover:cursor-pointer'
                    >
                        {user.username}
                    </div>
                    <div className="text-[15px] container text-neutral-600">
                                {user?.user ? `@${user.user}`: `@${user.username}` }
                        </div>
                    <div className="text-[15px] container">
                        {user?.description ? `${user.description}`: `Descripción` }
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center h-[82px]'>
            {
            isFollowing
                ?   <button
                    onClick={async ()=>{
                        await followUser(id) 
                        setIsFollowing(false)
                    }}
                    className='h-[36px] w-[116px] bg-black border border-neutral-500 rounded-full font-semibold focus:outline-none hover:border-red-900'
                    >
                        Siguiendo
                    </button>
                :   <button
                    onClick={async ()=>{
                        await followUser(id) 
                        setIsFollowing(true)
                    }}
                    className='h-[36px] w-[116px] bg-white text-black rounded-full font-semibold focus:outline-none hover:bg-sky-500'>
                        Seguir
                    </button>
        
            }
            </div>
            
        </div>
    );
};

export default UserCard;