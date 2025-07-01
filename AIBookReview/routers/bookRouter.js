import { Router } from "express";
import { createbook,getbooks,updatebook,deletebook } from "../controllers/bookController.js";

const router=Router()

router.post('/create-book',createbook)
router.get('/get-book',getbooks)
router.put('/update-book/:id',updatebook)
router.delete('/delete-book/:id',deletebook)



export default router
