import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { usePost } from '../context/PostContext';
import {useAuth} from '../context/AuthContext'

import CompTweet from '../components/CompTweet';
import Retweet from '../components/Retweet';

import {FaUserCircle} from 'react-icons/fa'
import {AiOutlineLoading3Quarters, AiOutlineArrowLeft, AiOutlineClose} from 'react-icons/ai'
import EditProfile from '../components/EditProfile';

const Profile = () => {

    const {getTweets, posts} = usePost()
    const {getUser, followUser} = useUser()
    const userViewer = useAuth().state.user

    const params = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isFollowing, setIsFollowing] =useState(false)

    const callUser = async(userId)=>{
        const data = await getUser(userId)   
        setUser(data)
        await getTweets(userId)
    }
    useEffect(()=>{  
        callUser(params.id)
        setIsFollowing(userViewer.following.includes(user?._id))
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
            {
            isOpenEdit && 
            <div className='fixed w-[120vw] min-h-[100vh] bg-white/30 text-white flex items-start justify-center pt-[5vh] ml-[-600px] z-[20]'>
                <div 
                className='w-[600px] max-h-[80vh] pb-[32px] rounded-2xl bg-black text-base'
                >
                    <div className='h-[53px] flex items-center pl-[16px]'>
                        <div className='w-[30px] h-[30px] hover:cursor-pointer hover:bg-neutral-800/50  rounded-2xl flex items-center justify-center'>
                            <AiOutlineClose
                            onClick={()=>setIsOpenEdit(false)}
                            className='w-[18px] h-[18px]'/>
                        </div>  
                        <h2 className='font-semibold text-[20px] ml-[10px]'>
                            Editar perfil
                        </h2>
                    </div>
                    <EditProfile/>
                </div>
                
            </div>
            }
            <div>
                
                <div className='container h-[53px] border-b border-neutral-800 pl-[16px] flex items-center justify-between'>
                    <div className='w-[56px] h-full flex items-center'>
                        <div 
                        onClick={()=>navigate('/')}
                        className='w-[30px] h-[30px] hover:cursor-pointer hover:bg-neutral-800/50  rounded-2xl flex items-center justify-center'>
                            <AiOutlineArrowLeft className='h-5 w-5 text-neutral-200'/>
                        </div>
                    </div>
                    <div className="text-[20px] font-semibold container">
                        {user.username}
                    </div>
                </div>
                
                {user?.cover
                    ?<div><img className='object-cover h-[200px] w-[596px]' src={user.cover.url} alt={user.cover.public_id} /></div>
                    :<div className='h-[200px] container border-b border-neutral-800 bg-amber-700'>
                    
                    </div>
                }
                <div className='absolute top-[192px] left-[446px] z-[10]'>
                    {user?.image 
                        ? <div><img className='object-cover h-[133px] w-[133px] rounded-full border-4 border-black' src={user.image.url} alt={user.image.public_id}/></div> 
                        :<FaUserCircle className='h-[133px] w-[133px] text-neutral-800 rounded-full border-4 border-black bg-black'/>
                    }
                </div>
                <div className='h-[230px] container px-[12px] py-[16px]'>
                    <div className='h-[68px] container flex justify-end'>
                        {
                            userViewer._id === params.id 
                            ?   <button
                                onClick={()=>setIsOpenEdit(true)}
                                className='h-[36px] w-[116px] border border-neutral-600 rounded-full font-semibold hover:bg-neutral-800/60'>
                                    Editar perfil
                                </button>

                            :   isFollowing
                                    ?   <button
                                        onClick={async ()=>{
                                            await followUser(params.id) 
                                            setIsFollowing(false)
                                        }}
                                        className='h-[36px] w-[116px] bg-white text-black rounded-full font-semibold'>
                                            Siguiendo
                                        </button>
                                    :   <button
                                        onClick={async ()=>{
                                            await followUser(params.id) 
                                            setIsFollowing(true)
                                        }}
                                        className='h-[36px] w-[116px] bg-sky-500 rounded-full font-semibold focus:outline-none'>
                                            Seguir
                                        </button>
                            
                        }
                    </div>
                    <div className='mt-[4px] mb-[12px]'>
                        <div className="text-[20px] font-semibold container">
                            {user.username}
                        </div>
                        <div className="text-[15px] container text-neutral-600">
                            {user?.user ? `@${user.user}`: `@${user.username}` }
                        </div>
                        
                    </div>
                    <div className="text-[15px] container">
                        {user?.description ? `${user.description}`: `Descripción` }
                    </div>
                    <div className="text-[15px] container text-neutral-600">
                        {user.created_at}
                    </div>
                    <div className="text-[15px] container text-neutral-600">
                        <button
                        onClick={()=>navigate(`/${user._id}/following`)}
                        >
                            {user.following ? user.following.length : 0} Siguiendo    
                        </button>
                        <button
                        className='ml-[8px]'
                        onClick={()=>navigate(`/${user._id}/followers`)}
                        >
                            {user.followers ? user.followers.length : 0} Seguidores
                        </button>
                    </div>
                </div>
                <div className='h-[53px] container border-b border-neutral-800 flex justify-around'>
                    <div className='flex justify-center items-center'>
                        Tweets
                    </div>
                    <div className='flex justify-center items-center text-neutral-500'>
                        Respuestas
                    </div>
                    <div className='flex justify-center items-center text-neutral-500'>
                        Fotos y videos
                    </div>
                    <div className='flex justify-center items-center text-neutral-500'>
                        Me gusta
                    </div>
                </div>
                {
                    user.retweets
                    && <div className="flex flex-col flex-nowrap px-[16px]">
                        {
                            user.retweets.map (retweet =>{
                                return <div key={retweet} className="container m-auto">
                                            <Retweet retweet={retweet} user={user.username}/>
                                       </div>
                            })
                        }
                    </div>
                }
                {
                            posts.length === 0
                            ?
                            <div className="flex flex-col justify-center items-center text-white py-[20px]">
                                    <h1>No hay Tweets</h1>
                            </div>
                            :
                            <div className="flex flex-col flex-nowrap">
                                {
                                posts.map (post => { 

                                    return  <div key={post._id} className="container m-auto">
                                                <CompTweet post={post}/>
                                            </div>
                                })
                                }
                            </div>
                            
                    }
            </div>
        </div>
        
        
    );
};

export default Profile;