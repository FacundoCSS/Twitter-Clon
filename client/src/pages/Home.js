import { useEffect, useState } from "react";
import CreateTweetForm from "../components/CreateTweetForm";
import CompTweet from '../components/CompTweet'

import {usePost} from "../context/PostContext";
import {useAuth} from '../context/AuthContext'

const Home = () => {

    const {getAllTweets, posts, getTweets} = usePost()

    const user = useAuth().state.user
    const [forYouPage, setForYouPage] = useState(true)
    const [tweets, setTweets] = useState([])

    const getHomeTweets = async()=>{
        if(user){
            await getAllTweets()
        }
    }

    const getFollowingTweets = async()=>{
        let dataa = []
        for (let follow of user.following){
            const data = await getTweets(follow)
            dataa.push(...data)
        }
        setTweets(dataa)
    }
    useEffect(()=>{
        getHomeTweets()
        getFollowingTweets()
    }, [])




    return (
            <div>
                <header className="border-b border-neutral-800 pt-[12px]">
                    <h1 className="h-[53px] text-neutral-200 font-semibold font-[arial] pl-[12px] text-[20px]">Inicio</h1>
                    <div className="h-[53px] flex">
                        <h2 
                        onClick={()=>setForYouPage(true)}
                        className="text-neutral-200 font-semibold font-[arial] text-[15px] py-[16px] w-[50%] text-center hover:bg-neutral-800 cursor-pointer"
                        >
                            Para ti
                        </h2>
                        <h2 
                        onClick={()=>setForYouPage(false)}
                        className="text-neutral-700 font-semibold font-[arial] text-[15px] py-[16px] w-[50%] text-center hover:bg-neutral-800 cursor-pointer"
                        >
                            Siguiendo
                        </h2>
                    </div>
                </header>
                <CreateTweetForm/>
                
                {
                        forYouPage ?
                        posts.length === 0
                        ?
                        <div className="flex flex-col justify-center items-center text-white">
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
                        : tweets.length === 0
                        ?
                        <div className="flex flex-col justify-center items-center text-white">
                                <h1>No hay Tweets</h1>
                        </div>
                        :
                        <div className="flex flex-col flex-nowrap">
                            {
                            tweets.map (tweet => { 
                                console.log(tweet)
                                return  <div key={tweet._id} className="container m-auto">
                                            <CompTweet post={tweet}/>
                                        </div>
                            })
                            }
                        </div>
                        
                }

            </div>
    );
};

export default Home;