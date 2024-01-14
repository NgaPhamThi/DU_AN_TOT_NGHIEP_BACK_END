import express from 'express'

import { signin,signup,getUser,getUserById,updateUser,removeUser,forgotPassword,resetPassword } from '../controllers/users.js' 

const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/user',getUser)
router.post('/forgot_password', forgotPassword);
router.get('/user/:id',getUserById)
router.delete('/user/:id',removeUser)
router.put('/user/:id',updateUser)
router.post('/reset_password', resetPassword);
export default router