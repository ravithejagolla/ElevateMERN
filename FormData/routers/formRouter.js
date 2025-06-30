
import { Router } from "express";
import { formsubmission,getallform } from "../controllers/formController.js";
import { validatedata } from "../middlewares/validator.js";

const router=Router()

router.post('/form-submit',validatedata,formsubmission)
router.get('/getform',getallform)


export {router}