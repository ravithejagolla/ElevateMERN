
import { Router } from "express";
import { getbooks} from "../controllers/bookController.js";

const router=Router()


router.get('/getbooks',getbooks)



export default router


