import React, {useEffect, useState} from 'react';
import CompTweet from './CompTweet';
import { usePost } from '../context/PostContext';

import {AiOutlineRetweet, AiOutlineLoading3Quarters} from 'react-icons/ai'

const Retweet = ({retweet, user}) => {

    const {getTweet} = usePost()
    const [post, setPost] = useState()
    
    const callData = async()=>{
        const tweet = await getTweet(retweet)
        await setPost(tweet.data)
    }

    useEffect(()=>{  
        callData()
    },[])

    if(!post){
        return (
            <div className='flex text-white border-b border-neutral-800 container py-[16px]'>
                <AiOutlineLoading3Quarters className='animate-spin h-5 w5 m-auto'/>
            </div>
        )
    }

    return (
        <div>
            <div className='container flex items-center mt-[12px] text-neutral-600 font-semibold'>
                <AiOutlineRetweet className='w-[18px] h-[18px] mr-[5px]'/>
                <div>
                    {user} Retwitteó
                </div>
            </div>
            <CompTweet post={post}/>
        </div>
    );
};

export default Retweet;