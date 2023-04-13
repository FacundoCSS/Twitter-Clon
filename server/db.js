import mongoose from "mongoose";
import {MONGODB_URI} from "./config.js"
mongoose.set('strictQuery',true)

export async function connectDB(){
    try {
        const db = await mongoose.connect(MONGODB_URI)
        console.log('Connected to ', db.connection.name)
    } catch (error) {
        console.log(error)
    }
}

