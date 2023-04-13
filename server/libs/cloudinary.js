import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: "dsjjr9z4i",
    api_key: "866348547787231",
    api_secret: "HuFZDVBrFPOkSb5rFcvlhCu9rT4"
})

export const uploadImage = async filePath =>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'users'
    })
}

export const uploadCover = async filePath =>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'covers'
    })
}

export const uploadPostImage = async filePath =>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })
}

export const deleteImage = async id =>{
    return await cloudinary.uploader.destroy(id)
}