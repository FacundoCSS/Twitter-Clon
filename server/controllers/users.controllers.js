import User from "../models/User.js";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import {uploadCover, uploadImage, deleteImage} from '../libs/cloudinary.js'
import fse from 'fs-extra';

import dotenv from "dotenv";
dotenv.config()

export const signup = async ( req , res ) => {
    const {username, email, password} = req.body;

    const newUser = new User({
        username,
        email,
        password
    });
    console.log(newUser)
    
    newUser.password = await newUser.encryptPassword(password)

    const token = await jwt.sign({ id: newUser._id }, process.env.secret, {
        expiresIn: 60 * 60 * 24 * 365, // expires in 1 year
      });

    await newUser.save()



    return res.json({
        satus: true,
        user: newUser,
        token,
        message: "User registered succesfully"
    })
}

export const signin = async ( req , res ) => {
    const {username, password} = req.body;

    const user = await User.findOne({username: username});
    if(!user){
        return res.json({
            auth: false,
            message: "This username doesn't exist"
        })
    }

    const autenticate = await user.confirmPassword(password);
    if(!autenticate){
        return res.json({
            auth: false,
            message: 'Username or password incorrect'
        })
    }

    const token = await jwt.sign({ id: user._id }, process.env.secret, {
        expiresIn: 60 * 60 * 24 * 365, // expires in 1 year
      });
      
    if(!token)  {
        return res.json({
            auth: false,
            message: 'There was a problem, try it again'
        })
    }

    console.log(user)

    return res.json({
        auth: true,
        user,
        token
    })
}

export const updateUser = async ( req, res ) => {
    let image;
    let cover;

    if(req.files?.image){
        const result =await uploadImage(req.files.image.tempFilePath)        
        await fse.remove(req.files.image.tempFilePath)
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
        try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {image : image}, {new: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
    }

    if(req.files?.cover){
        const result = await uploadCover(req.files.cover.tempFilePath)        
        await fse.remove(req.files.cover.tempFilePath)
        cover = {
            url: result.secure_url,
            public_id: result.public_id
        }
        try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {cover : cover}, {new: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
    }

    if(req?.body){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.json(updatedUser)

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

}

export const deleteUser = async ( req, res ) => {

    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.sendStatus(404);
        
        const posts = await Post.find({created_by: req.params.id})
        for (post of posts){
            if (post && post.image.public_id) {
                await deleteImage(post.image.public_id);
              }
        }
        

        await Post.deleteMany({created_by: req.params.id})
        res.sendStatus(204);

    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
      }
}

export const logout = async ( req, res ) => {
    res.status(200).send({ auth: false, token: null, user: null });
  };

export const getUser = async ( req, res ) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.sendStatus(404)
        return res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const follow = async ( req, res ) => {
    try {
        const user = await User.findById(req.params.id)
        const follower = await User.findById(req.userId)

        if(user.followers.includes(req.userId)){
            const newArray = user.followers.filter(word => word !==  req.userId)
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {followers: newArray}, {new: true})

            const secondArray = follower.following.filter(word => word !==  req.params.id)
            const updatedFollower = await User.findByIdAndUpdate(req.userId, {following: secondArray}, {new: true})
            console.log('unfollow')
            res.json({updatedUser, updatedFollower})

        }else{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {"$push": {followers: req.userId}}, {new: true})
            
            const updatedFollower = await User.findByIdAndUpdate(req.userId,  {"$push": {following: req.params.id}})
            console.log('follow')
            res.json({updatedUser, updatedFollower})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})

    }
}