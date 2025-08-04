import express from 'express'
import { getData } from '../controllers/user.controller.js'
import auth from '../middlware/auth.middlware.js';
const router = express.Router();

router.get('/data',auth,getData);

export default router ;