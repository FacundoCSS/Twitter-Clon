import {useState, useContext, createContext} from 'react';
import { getTweetsRequest, getAllTweetsRequest, createTweetRequest, deleteTweetRequest, updateTweetRequest, retweetRequest, likeRequest, commentaryRequest, citedRetweetRequest, getTweetRequest } from '../api/post';

const context = createContext()

export const usePost = ()=>{
    const newContext = useContext(context)
    return newContext
}

const PostProvider = ({children})=>{

    const [posts, setPosts] = useState([])

    const getAllTweets = async ()=>{
        const res = await getAllTweetsRequest()
        setPosts(res.data.tweets)
    }

    const getTweets = async (id)=>{
        const res = await getTweetsRequest(id)
        return res.data.tweets
    }

    const createTweet = async (data)=>{
        try {
            const res = await createTweetRequest(data)
            setPosts([...posts, res.data])
        } catch (error) {
            Promise.reject(error)
        }
    }

    const deleteTweet = async (id)=>{
        try{
            const res = await deleteTweetRequest(id)
            if(res.status === 204){
                setPosts(posts.filter((post)=> post._id !== id));
            }
        }
        catch(error){
            Promise.reject(error)
        }
    }

    const getTweet = async(id)=>{
        const res = await getTweetRequest(id)
        return res
    }

    const updateTweet = async(id, data)=>{
        try {
            const res = await updateTweetRequest(id, data)
            setPosts(posts.map((post) => post._id === id ? res.data : post));
        } catch (error) {
            Promise.reject(error)
        }
    }

    const retweet = async(id)=>{
        const res = await retweetRequest(id)
        return res
    }

    const like = async(id)=>{
        const res = await likeRequest(id)
        return res
    }

    const commentary = async(id, data)=>{
        try {
            const res = await commentaryRequest(id, data)
            console.log(res)
            setPosts(posts.map((post) => post._id === id ? res.data : post));
        } catch (error) {
            Promise.reject(error)
        }
    }

    const citedRetweet = async(id, data)=>{
        try {
            const res = await citedRetweetRequest(id, data)
            setPosts(posts.map((post) => post._id === id ? res.data : post));
            return res.data
        } catch (error) {
            Promise.reject(error)
        }
    }


    return (
        <context.Provider value={{
            posts,
            getTweets,
            getAllTweets,
            createTweet,
            deleteTweet,
            getTweet,
            updateTweet,
            like,
            retweet,
            commentary,
            citedRetweet
        }}>
            {children}
        </context.Provider>
    );
}

export default PostProvider