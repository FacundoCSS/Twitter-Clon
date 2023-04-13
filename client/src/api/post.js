import axios from 'axios'

export const getTweetsRequest = async (id)=> await axios.get(`/posts/${id}`)

export const getAllTweetsRequest = async () => await axios.get('/posts')

export const createTweetRequest = async (post)=>{
    console.log('xd')
    const form = new FormData()
    for (let key in post){
        form.append(key, post[key])}
    return await axios.post('/new', form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}  

export const deleteTweetRequest = async (id)=> await axios.delete(`/${id}`)

export const getTweetRequest = async (id)=> await axios.get(`/${id}`)

export const updateTweetRequest = async (id, post)=>await axios.put(`/${id}`, post)

export const retweetRequest = async (id)=> await axios.get(`/retweet/${id}`)

export const likeRequest = async (id)=> await axios.get(`/like/${id}`)

export const commentaryRequest = async (id, post)=>{
    const form = new FormData()
    for (let key in post){
        form.append(key, post[key])}
    return await axios.post(`/commentary/${id}`, form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const citedRetweetRequest = async (id, data)=>{
    const form = new FormData()
    for (let key in data){
        form.append(key, data[key])}
    return await axios.post(`/citedtweet/${id}`, form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}