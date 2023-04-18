import React,{useEffect, useState, } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import { format } from 'fecha';

import CreateTweetForm from './CreateTweetForm';

import { useUser } from "../context/UserContext";
import { usePost } from '../context/PostContext';
import {useAuth} from '../context/AuthContext'

import {FaUserCircle, FaRegComment} from 'react-icons/fa'
import {AiOutlineLoading3Quarters, AiOutlineHeart, AiOutlineRetweet, AiFillHeart} from 'react-icons/ai'
import {FiShare} from 'react-icons/fi'
import {BsPencil} from 'react-icons/bs'

const CompTweet = ({post, userComment, postID}) => {

    const navigate = useNavigate()

    const {getUser} = useUser()
    const {like, retweet, getTweet} = usePost()
    const userViewer = useAuth().state.user

    const [user, setUser] = useState()
    const [cited, setCited] = useState()
    const [userCited, setUserCited] = useState()
    const [postData, setPostData] = useState(post)

    const [isOpenTweeting, setIsOpenTweeting] = useState(false)
    const [isOpenRetweet, setIsOpenRetweet] = useState(false)
    const [isOpenCitedRetweet, setIsOpenCitedRetweet] = useState(false)
    const [Isliked, setIsLiked] = useState(false)
    const [IsRetweeted, setIsRetweeted] = useState(false)

    const [likes, setLikes] = useState(0)

    const callData = async(id)=>{
        const tweet = await getTweet(postID)
        setPostData(tweet.data)
        callUser(tweet.data.created_by)
    }


    const callUser = async(createdBy)=>{
        const data = await getUser(createdBy)
        setUser(data)
        if (postData?.cited_id && !postID) {
            const tweet = await getTweet(postData.cited_id)
            setCited(tweet.data)
            const userData  = await getUser(tweet.data.created_by)
            setUserCited(userData)
        }
    }

    useEffect(()=>{  
        if (postID){
            callData(postID)
        } else {
            callUser(postData.created_by)
            setIsLiked(postData?.likes.includes(userViewer?._id))
            setLikes(postData.likes ? postData.likes.length : 0)
            setIsRetweeted(postData?.retweets.includes(userViewer?._id))
        }
        
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
                isOpenRetweet
                && <div 
                onClick={()=>{
                    setIsOpenRetweet(false)
                }}
                className='fixed w-[100vw] min-h-[100vh] top-[0] left-[0] z-10'>

                </div>
            }
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
                                            {format(new Date(postData.created_at), 'DD MMM, YYYY')}
                                        </div>
                                    </div>
                                    <p>{postData.content}</p>
                                </div>
                            </div>
                        </div>
                        <CreateTweetForm userComment={user} tweet={postData} userRetweet={user}/>
                    </div>
                </div>
            }
            {
                isOpenCitedRetweet &&
                <div className='fixed w-[100vw] min-h-[100vh] bg-sky-200/20 text-white flex items-start justify-center pt-[5vh] top-[0] left-[0]'>
                    <div 
                    className='w-[600px] max-h-[90vh] p-[32px] rounded-2xl bg-black text-base scroll-auto'
                    >
                        <div
                        className='hover:cursor-pointer'
                        onClick={()=>setIsOpenCitedRetweet(false)}
                        >
                            X
                        </div>
                        
                        <CreateTweetForm userRetweet={user} retweet={postData}/>
                    </div>
                </div>
            }
            <Link
             className='flex text-white border-b border-neutral-800 container px-[16px]'
            to={`/tweet/${postData._id}`}
            >
                <div className='h-full flex pt-[12px] justify-center w-[70px] mr-[12px]'>
                {user?.image 
                    ? <div><img className='object-cover h-12 w-12 rounded-full' src={user.image.url} alt={user.image.public_id}/></div> 
                    :<FaUserCircle className='h-12 w-12 text-neutral-800'/>
                }
                </div>
                <div className='container'>
                    <div className='pt-[12px]'>
                    {
                        userComment
                        &&  <div
                            className='text-neutral-500 flex container py-[6px] container'
                            >
                                Respondiendo a <div className='text-sky-500 pl-[5px]'>@{userComment.username}</div>
                            </div>
                    }
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
                                {format(new Date(postData.created_at), 'DD MMM, YYYY')}
                            </div>
                        </div>
                        <p>{postData.content}</p>
                        {postData.image && <img src={postData.image.url} className='object-contain max-w-[466px] max-h-[580px] rounded-xl' alt={postData.title}/> }
                        
                    </div>
                    {
                            userCited && 
                            <div
                            className='my-[20px] pt-[10px] text-white border border-neutral-600 rounded-2xl hover:bg-neutral-800/30'
                            onClick={e=>{
                                e.preventDefault()
                                navigate(`/tweet/${cited._id}`)
                            }}
                            >
                                    <div>
                                        <div className='flex items-start justify-between px-[16px]'>
                                            <div className='min-w-[24px]'>
                                                {userCited?.image 
                                                    ? <div className='' ><img className='object-cover h-[20px] w-[20px] rounded-full' src={userCited.image.url} alt={userCited.image.public_id}/></div> 
                                                    :<FaUserCircle className='h-[20px] w-[20px] text-neutral-800'/>
                                                }
                                            </div>
                                            <p 
                                            className=' font-semibold font-[arial] hover:cursor-pointer'
                                            >
                                                {userCited.username}
                                            </p>
                                            <div className="text-[15px] pl-[5px] text-neutral-600">
                                                    {userCited?.user ? `@${userCited.user}`: `@${userCited.username}` }
                                            </div>
                                            <div className="text-[15px] pl-[5px] text-neutral-600 container ">
                                                {format(new Date(cited.created_at), 'DD MMM, YYYY')}
                                            </div>
                                        </div>
                                        <p className=' px-[16px]'>{cited.content}</p>
                                        {cited?.image && <img src={cited.image.url} className='object-cover container max-h-[300px] rounded-t rounded-xl' alt={cited.title}/> }
                                    </div>
                            </div>
                            }
                    <div className='flex container mt-[12px] pb-[10px] justify-around text-neutral-500'>
                        <div
                        onClick={(e)=>{
                            e.preventDefault()
                            setIsOpenTweeting(true)
                        }}
                        className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#0284c730] hover:text-[#0284c7] rounded-full flex items-center justify-center'>
                            <FaRegComment className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                            {postData.comments ? postData.comments.length : 0}
                        </div>
                        {
                            isOpenRetweet
                            && <div 
                                className={
                                    IsRetweeted
                                    ?'absolute w-[195px] h-[88px] bg-black flex flex-col rounded rounded-xl text-white drop-shadow-[0_0_3px_#fff] ml-[-90px] z-20'
                                    :'absolute w-[145px] h-[88px] bg-black flex flex-col rounded rounded-xl text-white drop-shadow-[0_0_3px_#fff] ml-[-90px] z-20'
                                }
                                >
                                    <div 
                                    className='container flex items-center justify-center h-[44px] hover:bg-neutral-800/30 cursor-pointer rounded-b rounded-2xl'
                                    onClick={async (e)=>{
                                        e.preventDefault()
                                        await retweet(postData._id)
                                        setIsOpenRetweet(false)
                                    }}
                                    >
                                        <AiOutlineRetweet className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                        {IsRetweeted ? 'Deshacer Retweet' : 'Retwittear'}
                                    </div>
                                    <div 
                                    className='flex items-center justify-center h-[44px] hover:bg-neutral-800/30 cursor-pointer rounded-t rounded-2xl'
                                    onClick={e=>{
                                        e.preventDefault()
                                        setIsOpenCitedRetweet(true)
                                        setIsOpenRetweet(false)
                                    }}
                                    >
                                        <BsPencil className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>              
                                        Citar Tweet
                                    </div>
                                </div>
                        }
                        <div 
                        className={
                            IsRetweeted
                                ? 'w-[40px] text-[#269969] h-[40px] hover:cursor-pointer hover:bg-[#05966930]  rounded-full flex items-center justify-center'
                                : 'w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#05966930] hover:text-[#059669] rounded-full flex items-center justify-center'
                        }
                        onClick={(e)=>{
                            e.preventDefault()
                            setIsOpenRetweet(true)

                        }}
                        >
                            <AiOutlineRetweet className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                            {postData.retweets || postData.cited_retweets ? postData.cited_retweets.length + postData.retweets.length : 0}
                        </div>
                        {
                            Isliked 
                            ? <div 
                            className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#e11d4830] text-[#e11d48] rounded-full flex items-center justify-center'
                            onClick={async (e)=>{
                                e.preventDefault()
                                setIsLiked(false)
                                await like(postData._id)
                                setLikes(likes - 1)
                            }}
                            >
                                <AiFillHeart className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                {likes}
                            </div>
                            : <div 
                            className='w-[40px] h-[40px] hover:cursor-pointer hover:bg-[#e11d4830] hover:text-[#e11d48] rounded-full flex items-center justify-center'
                            onClick={async (e)=>{
                                e.preventDefault()
                                setIsLiked(true)
                                await like(postData._id)
                                setLikes(likes + 1)
                            }}
                            >
                                <AiOutlineHeart className='w-[18px] h-[18px] mr-[5px] hover:cursor-pointer'/>
                                {likes}
                            </div>
                        }

                        <div className='w-[30px] h-[30px] hover:cursor-pointer hover:bg-[#0284c730] hover:text-[#0284c7] rounded-2xl flex items-center justify-center'>
                            <FiShare className='w-[18px] h-[18px]'/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CompTweet;