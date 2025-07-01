
import { Router } from "express";
import { createreview,updatereview,deletereview } from "../controllers/reviewController.js";
import { userprotect } from '../middlewares/authmiddleware.js'


const router=Router()

router.post('/create-review',userprotect,createreview)
router.put('/upadete-review/:id',userprotect,updatereview)
router.delete('/delete-review/:id',userprotect,deletereview)


export default router