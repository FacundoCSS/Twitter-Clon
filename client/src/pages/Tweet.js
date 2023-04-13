import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { format } from 'fecha';

import { useUser } from "../context/UserContext";
import { usePost } from '../context/PostContext';
import {useAuth} from '../context/AuthContext'
import CreateTweetForm from '../components/CreateTweetForm'
import CompTweet from '../components/CompTweet';

import {FaUserCircle} from 'react-icons/fa'
import {AiOutlineLoading3Quarters, AiOutlineHeart, AiOutlineRetweet, AiOutlineArrowLeft, AiFillHeart} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {FiShare} from 'react-icons/fi'
import UserCard from '../components/UserCard';


const Tweet = () => {

    const {getTweet, like} = usePost()
    const {getUser} = useUser()
    const userViewer = useAuth().state.user

    const params = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [post, setPost] = useState()
    const [comments, setComments] = useState([])

    const [isOpenTweeting, setIsOpenTweeting] = useState(false)
    const [isOpenRetweets, setIsOpenRetweets] = useState(false)
    const [isOpenCitedRetweets, setIsOpenCitedRetweets] = useState(false)
    const [isOpenLikes, setIsOpenLikes] = useState(false)
    const [Isliked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)


    const callData = async()=>{
        const tweet = await getTweet(params.tweet)
        await setPost(tweet.data)
        const data = await getUser(tweet.data.created_by)
        await setUser(data)
        if(tweet.data.comments.length !== 0){
            const comentarios = []
            for await (const commentId of tweet.data.comments){
                const comment = await getTweet(commentId)
                comentarios.push(comment.data)
            }
            setComments(comentarios)
        }
        await setIsLiked(post?.likes.includes(userViewer?._id))
        await setLikes(post.likes ? post.likes.length : 0)
    }

    const callPosts = async(id)=>{
        const tweet = await getTweet(id)
        return tweet
    }

    useEffect(()=>{  
        callData()
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
            {isOpenTweeting 
            &&  <div className='fixed w-[100vw] min-h-[100vh] bg-sky-200/20 text-white flex items-start justify-center pt-[5vh] top-[0] left-[0]'>
                    
                    <div 
                    className='w-[600px] max-h-[80vh] p-[32px] rounded-2xl bg-black text-base'
                    >
                        <div
                        className='hover:cursor-pointer'
                        onClick={()=>setIsOpenTweeting(false)}
                        >
                            X
                        </div>
                        <div className='mb-[20px] py-[10px] text-white container px-[16px] border-b border-neutral-600'>
                            <div className='flex '>
                                <div className='h-full flex pt-[12px] justify-center w-[70px] mr-[12px]'>
                                {user?.image 
                                    ? <div><img className='object-cover h-12 w-12 rounded-full' src={user.image.url} alt={user.image.public_id}/></div> 
                                    :<FaUserCircle className='h-12 w-12 text-neutral-800'/>
                                }
                                </div>
                                <div>
                                    <div className='flex'>
                                        <p 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            navigate(`/user/${user._id}`)
                                        }}
                                        className=' font-semibold font-[arial] hover:cursor-pointer'
                                        >
                                            {user.username}
                                        </p>
                                        <div className="text-[15px] pl-[5px] text-neutral-600">
                                                {user?.user ? `@${user.user}`: `@${user.username}` }
                                        </div>
                                        <div className="text-[15px] pl-[5px] text-neutral-600 container ">
                                            {format(new Date(post.created_at), 'DD MMM, YYYY')}
                                        </div>
                                    </div>
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        </div>
                        <CreateTweetForm userComment={user} tweet={post}/>
                    </div>
                </div>
            }
            {isOpenRetweets && 
            <div className='fixed w-[100vw] min-h-[100vh] bg-sky-200/20 text-white flex items-start justify-center pt-[5vh] top-[0] left-[0]'>
                <div 
                className='w-[600px] max-h-[80vh] px-[32px] py-[12px] rounded-2xl bg-black text-base'
                >
                <div
                className='flex h-[53px]'
                >
                    <div
                    className='cursor-pointer mr-[30px]'
                    onClick={()=>setIsOpenRetweets(false)}
                    >
                        X 
                    </div>
                    <div className='font-semibold text-[20px]'>
                        Retwiteado por
                    </div>
                </div>
                <div>
                {                  
                    <div className="flex flex-col-reverse flex-nowrap text-white">
                        {
                        post?.retweets
                            ? post.retweets.map (id => { 

                                getTweet

                                return  <div key={id} className="container m-auto">
                                            <UserCard id={id}/>
                                        </div>
                            })
                            : <div>No hay retweets</div>
                        }
                    </div>   
                }
                </div>
                </div>
            </div>
            }
            {isOpenCitedRetweets && 
            <div className='fixed w-[100vw] min-h-[100vh] bg-sky-200/20 text-white flex items-start justify-center pt-[5vh] top-[0] left-[0]'>
            <div 
            className='w-[600px] max-h-[80vh] px-[32px] py-[12px] rounded-2xl bg-black text-base'
            >
            <div
            className='flex h-[53px]'
            >
                <div
                className='cursor-pointer mr-[30px]'
                onClick={()=>setIsOpenCitedRetweets(false)}
                >
                    X 
                </div>
                <div className='font-semibold text-[20px]'>
                    Citado por
                </div>
            </div>
            <div>
            {                  
                    <div className="flex flex-col-reverse flex-nowrap text-white">
                        {
                        post?.cited_retweets
                            ? post.cited_retweets.map (post => { 

                                return  <div key={post._id} className="container m-auto">
                                            <CompTweet post={post}/>
                                        </div>
                            })
                            : <div>No hay retweets</div>
                        }
                    </div>   
                }
            </div>
            </div>
        </div>
            }
            {isOpenLikes && 
            <div className='fixed w-[100vw] min-h-[100vh] bg-sky-200/20 text-white flex items-start justify-center pt-[5vh] top-[0] left-[0]'>
            <div 
            className='w-[600px] max-h-[80vh] px-[32px] py-[12px] rounded-2xl bg-black text-base'
            >
            <div
            className='flex h-[53px]'
            >
                <div
                className='cursor-pointer mr-[30px]'
                onClick={()=>setIsOpenLikes(false)}
                >
                    X 
                </div>
                <div className='font-semibold text-[20px]'>
                    Likeado por
                </div>
            </div>
            <div>
            {                  
                    <div className="flex flex-col-reverse flex-nowrap text-white">
                        {
                        post?.likes
                            ? post.likes.map (id => { 

                                return  <div key={id} className="container m-auto">
                                            <UserCard id={id}/>
                                        </div>
                            })
                            : <div>No hay Likes</div>
                        }
                    </div>   
                }
            </div>
            </div>
        </div>
            }
            <div>
                <div className='container h-[53px] pl-[16px] flex items-center justify-between'>
                        <div className='w-[56px] h-full flex items-center'>
                            <div 
                            onClick={()=>navigate('/')}
                            className='w-[30px] h-[30px] hover:cursor-pointer hover:bg-neutral-800/50  rounded-2xl flex items-center justify-center'>
                                <AiOutlineArrowLeft className='h-5 w-5 text-neutral-200'/>
                            </div>
                        </div>
                        <div className="text-[20px] font-semibold container">
                            Tweet
                        </div>
                </div>
                <div className='flex flex-col text-white border-b border-neutral-800 container px-[16px]'>
                    <div className='container flex justify-center'>
                        <div className='flex justify-center w-[70px] mr-[12px]'>
                        {user?.image 
                            ? <div><img className='object-cover h-12 w-12 rounded-full' src={user.image.url} alt={user.image.public_id}/></div> 
                            :<FaUserCircle className='h-12 w-12 text-neutral-800'/>
                        }
                        </div>
                        <div className='flex flex-col container'>
                            <p 
                            onClick={(e)=>{
                                e.preventDefault()
                                navigate(`/user/${user._id}`)
                            }}
                            className=' font-semibold font-[arial] hover:cursor-pointer container'
                            >
                                {user.username}
                            </p>
                            <div className="text-[15px] container text-neutral-600">
                                    {user?.user ? `@${user.user}`: `@${user.username}` }
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='pt-[12px]'>
                            
                            <p>{post.content}</p>
                            {post.image && <img src={post.image.url} className='object-contain max-w-[564px]' alt={post.title}/> }
                            
                        </div>
                        <div className='container mt-[12px]'>
                            <div className="text-[15px] container text-neutral-600 border-b border-neutral-800 h-[52px] flex items-center">
                                {format(new Date(post.created_at), 'hh:mm A  DD MMM, YYYY')}
                            </div>
                            <div className="text-[15px] container border-b border-neutral-800 h-[52px] flex items-center">
                                <div className='mr-[20px] flex'>
                                    <p className='font-semibold'>{post.retweets ? post.retweets.length : 0}</p> 
                                    <p 
                                    className='text-neutral-500 pl-[5px] cursor-pointer'
                                    onClick={()=>setIsOpenRetweets(true)}
                                    > Retweets</p>  
                                </div>
                                <div className='mr-[20px] flex'>
                                    <p className='font-semibold'>{post.cited_retweets ? post.cited_retweets.length : 0}</p> 
                                    <p 
                                    className='text-neutral-500 pl-[5px] cursor-pointer'
                                    onClick={()=>setIsOpenCitedRetweets(true)}
                                    > Citas</p>
                                </div>
                                <div className='mr-[20px] flex'>
                                    <p className='font-semibold'>{post.likes ? post.likes.length : 0}</p> 
                                    <p 
                                    className='text-neutral-500 pl-[5px] cursor-pointer'
                                    onClick={()=>setIsOpenLikes(true)}
                                    > Likes</p>   
                                </div>
                                
                            </div>
                            <div className='flex container mt-[12px] pb-[10px] justify-around text-neutral-500'>
                                <div
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setIsOpenTweeting(true)
                                }}
                                className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#0284c730] hover:text-[#0284c7] rounded-full flex items-center justify-center'>
                                    <FaRegComment className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                </div>

                                <div className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#05966930] hover:text-[#059669] rounded-full flex items-center justify-center'>
                                    <AiOutlineRetweet className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                </div>

                                {
                                    Isliked 
                                    ? <div 
                                    className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#e11d4830] text-[#e11d48] rounded-full flex items-center justify-center'
                                    onClick={async (e)=>{
                                        e.preventDefault()
                                        setIsLiked(false)
                                        await like(post._id)
                                        setLikes(likes - 1)
                                    }}
                                    >
                                        <AiFillHeart className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                    </div>
                                    : <div 
                                    className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#e11d4830] hover:text-[#e11d48] rounded-full flex items-center justify-center'
                                    onClick={async (e)=>{
                                        e.preventDefault()
                                        setIsLiked(true)
                                        await like(post._id)
                                        setLikes(likes + 1)
                                    }}
                                    >
                                        <AiOutlineHeart className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                    </div>
                                }

                                <div className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#0284c730] hover:text-[#0284c7] rounded-full flex items-center justify-center'>
                                    <FiShare className='w-[18px] h-[18px]'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CreateTweetForm userComment={user} tweet={post}/>
                {
                    comments.length === 0
                    ?
                    <div className="flex flex-col justify-center items-center text-white py-[20px]">
                            <h1>No hay Comentarios</h1>
                    </div>
                    :
                    <div className="flex flex-col flex-nowrap">
                        {
                        comments.map (comment => {
                            return  <div key={comment._id} className="container m-auto">
                                        <CompTweet post={comment} userComment={user}/>
                                    </div>
                        })
                        }
                    </div>
                                
                }
            </div>
        </div>
    );
};

export default Tweet;