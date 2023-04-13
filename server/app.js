import express from 'express'
import fileUpload from 'express-fileupload';
import userRoutes from './routes/users.routes.js'
import postRoutes from './routes/posts.routes.js'

const app = express()

// midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
}))

//routes
app.use(userRoutes)
app.use(postRoutes)

export default app