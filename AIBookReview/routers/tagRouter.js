
import { Router } from "express";
import { createtag,alltags } from "../controllers/tagController.js";

const router=Router()

router.post('/create-tages',createtag)
router.get('/gettag',alltags)


export default router