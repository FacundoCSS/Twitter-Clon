import { Router } from "express";
import { signin, signup, logout, getUser, follow, updateUser, deleteUser } from "../controllers/users.controllers.js";
import {verifyToken} from "../controllers/verify.controllers.js"

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.put('/follow/:id', verifyToken, follow);

export default router