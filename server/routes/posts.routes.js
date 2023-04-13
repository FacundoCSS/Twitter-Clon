import { Router } from "express";
import { citedRetweet, commentary, createTweet, deleteTweet, getTweet, getTweets, getAllTweets, like, retweet, updateTweet } from "../controllers/posts.controllers.js";
import {verifyToken} from "../controllers/verify.controllers.js"
const router = Router();

router.get('/posts/:id', verifyToken, getTweets);
router.get('/posts', verifyToken, getAllTweets)
router.post('/new', verifyToken, createTweet);
router.delete('/:id', verifyToken, deleteTweet);
router.get('/:id', verifyToken, getTweet);
router.put('/:id', verifyToken, updateTweet);
router.get('/retweet/:id', verifyToken, retweet);
router.get('/like/:id', verifyToken, like);
router.post('/commentary/:id', verifyToken, commentary);
router.post('/citedtweet/:id', verifyToken, citedRetweet);


export default router