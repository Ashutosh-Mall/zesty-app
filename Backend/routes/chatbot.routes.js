import express from 'express'
import {chatBot} from '../controllers/chatbot.controllers.js'
const router = express.Router();


router.post('/chatbot',chatBot);

export default router;