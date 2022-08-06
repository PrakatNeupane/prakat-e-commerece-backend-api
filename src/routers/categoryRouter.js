import express from "express"
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js"
const router = express.Router()

router.post("/", newCategoryValidation, (req, res, next) => {
    try {
        console.log(req.body) // if we get a console log here, we pass the validation, else we fail
    } catch (error) {
        console.log(error)
        error.status = 500
        next(error)
    }
})

export default router;