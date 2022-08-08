import express from "express"
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js"
import { insertCategory } from "../models/category/Category.model.js"
const router = express.Router()
import slugify from "slugify"

router.post("/", newCategoryValidation, async (req, res, next) => {
    try {
        console.log("pass or fail", req.body) // if we get a console log here, we pass the validation, else we fail
        const slug = slugify(req.body.catName, { lower: true, trim: true })
        console.log(slug)
        const result = await insertCategory(slug)
        console.log(result)
        result?._id ?
            res.json({ status: "success", message: 'New category has been added' }) :
            res.json({ status: "error", message: 'Unable to add the category, please try again later' })
    } catch (error) {
        console.log(error)
        error.status = 500
        next(error)
    }
})

export default router;