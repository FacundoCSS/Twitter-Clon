import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    image: {
        url: String,
        public_id: String
    },
    commented_id: String,
    cited_id: String,
    retweets : [],
    likes: [],
    comments: [],
    cited_retweets: []
    }
)


export default mongoose.model('Tweet', tweetSchema)