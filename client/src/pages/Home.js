import { useEffect } from "react";
import CreateTweetForm from "../components/CreateTweetForm";
import CompTweet from '../components/CompTweet'

import {usePost} from "../context/PostContext";
import {useAuth} from '../context/AuthContext'

const Home = () => {

    const {getAllTweets, posts} = usePost()

    const user = useAuth().state.user

    const getHomeTweets = async()=>{
        if(user){
            await getAllTweets()
        }
    }
    useEffect(()=>{
        getHomeTweets()
    }, [])




    return (
            <div>
                <header className="border-b border-neutral-800 pl-[12px] pt-[12px]">
                    <h1 className="h-[53px] text-neutral-200 font-semibold font-[arial] text-[20px]">Inicio</h1>
                    <div className="h-[53px] flex">
                        <h2 className="text-neutral-200 font-semibold font-[arial] text-[15px] py-[16px] w-[50%] text-center">Para ti</h2>
                        <h2 className="text-neutral-700 font-semibold font-[arial] text-[15px] py-[16px] w-[50%] text-center">Siguiendo</h2>
                    </div>
                </header>
                <CreateTweetForm/>
                
                {
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
                        
                }

            </div>
            // <div className="text-white">
            //     Trends
            // </div>
    );
};

export default Home;