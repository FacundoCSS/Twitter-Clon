import Post from "../models/Post.js"
import User from "../models/User.js"
import {uploadPostImage, deleteImage} from '../libs/cloudinary.js'
import fse from 'fs-extra';

export const getTweets = async ( req, res ) => {
try {
    const userID = req.params.id;
    const tweets = await (await Post.find({"created_by": userID})).reverse();


    return res.json({
        status: true,
        tweets
    })

} catch (error) {
    console.log(error)
}
}


export const getAllTweets = async ( req, res ) => {
    const tweets = await (await Post.find({})).reverse();
    // console.log(tweets)
    const secondTweets = tweets.filter(tweet => !tweet.commented_id)
    return res.json({
        status: true,
        // tweets
        tweets : secondTweets
    })
}

export const createTweet = async ( req, res ) => {
 try {
    let image;

    if(req.files?.image){
        const result =await uploadPostImage(req.files.image.tempFilePath)        
        await fse.remove(req.files.image.tempFilePath)
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
    }
    
    const {content} = req.body
    const userID = req.userId;

    const newTweet = new Post({
        content,
        image,
        created_by: userID
    })

    newTweet.save()

    res.json({
        status: true,
        message: "Tweeted successfully",
        newTweet
    })

 } catch (error) {
    console.log(error)
 }
}

export const updateTweet = async ( req, res ) => {
    try {
        const updatedTweet = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedTweet)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteTweet = async ( req, res ) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) return res.sendStatus(404);
        res.sendStatus(204);
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
      }
}

export const getTweet = async ( req, res ) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const retweet = async ( req, res ) => {
    try {
        const tweet = await Post.findById(req.params.id)
        const user = await User.findById(req.userId)

        if(tweet.retweets.includes(req.userId)){
            const newArray = tweet.retweets.filter(word => word !==  req.userId)
            const updatedTweet = await Post.findByIdAndUpdate(req.params.id, {retweets: newArray}, {new: true})

            const newUserLike = user.retweets.filter(word => word !==  req.params.id)
            await User.findByIdAndUpdate(req.userId, {retweets: newUserLike}, {new: true})

            res.json(updatedTweet)

        }else{
            const updatedTweet = await Post.findByIdAndUpdate(req.params.id, {"$push": {retweets: req.userId}})
            const updatedUserRetweet = await User.findByIdAndUpdate(req.userId, {"$push": {retweets: req.params.id}})

            res.json({updatedTweet, updatedUserRetweet})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})

    }

}

export const like = async ( req, res ) => {
    try {
        const tweet = await Post.findById(req.params.id)
        const user = await User.findById(req.userId)
        
        if(tweet.likes.includes(req.userId)){
            const newArray = tweet.likes.filter(word => word !==  req.userId)
            const updatedTweet = await Post.findByIdAndUpdate(req.params.id, {likes: newArray}, {new: true})
            
            const newUserLike = user.likes.filter(word => word !==  req.params.id)
            await User.findByIdAndUpdate(req.userId, {likes: newUserLike}, {new: true})

            res.json(updatedTweet)

        }else{
            const updatedTweet = await Post.findByIdAndUpdate(req.params.id, {"$push": {likes: req.userId}}, {new: true})
            const updatedUserLike = await User.findByIdAndUpdate(req.userId, {"$push": {likes: req.params.id}}, {new: true})


            res.json(updatedTweet)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})

    }
}

export const commentary = async ( req, res ) => {
    try {

        let image;

        if(req.files?.image){
            const result =await uploadPostImage(req.files.image.tempFilePath)        
            await fse.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const {content} = req.body
        const userID = req.userId;

        const newTweet = new Post({
            content,
            image,
            created_by: userID,
            commented_id: req.params.id
        })
        newTweet.save()
    
        const commentedTweet = await Post.findByIdAndUpdate(req.params.id, {"$push": {comments: newTweet._id}}, {new: true})

        res.json({
            status: true,
            tweet: commentedTweet,
            message: "Commented successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const citedRetweet = async ( req, res ) => {
    
    try {
        let image;

        if(req.files?.image){
            const result =await uploadPostImage(req.files.image.tempFilePath)        
            await fse.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const {content} = req.body
        const userID = req.userId;

        const newTweet = new Post({
            content,
            image,
            created_by: userID,
            cited_id: req.params.id
        })
        newTweet.save()
    
        const citedTweet = await Post.findByIdAndUpdate(req.params.id, {"$push": {cited_retweets: newTweet._id}})

        res.json({
            tweet: newTweet,
            cited: citedTweet,
            status: true,
            message: "Tweeted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}