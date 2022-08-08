import express from "express"
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js"
import { getCategories, insertCategory, updateCategoryById } from "../models/category/Category.model.js"
const router = express.Router()
import slugify from "slugify"

router.post("/", newCategoryValidation, async (req, res, next) => {
    try {
        console.log("pass or fail", req.body) // if we get a console log here, we pass the validation, else we fail
        const slug = slugify(req.body.catName, { lower: true, trim: true })
        console.log(slug)
        const result = await insertCategory({ ...req.body, slug })
        console.log(result)
        result?._id ?
            res.json({ status: "success", message: 'New category has been added' }) :
            res.json({ status: "error", message: 'Unable to add the category, please try again later' })
    } catch (error) {
        error.status = 500
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.status = 200
            error.message = "Category already exists, please use a new category name"
        }
        next(error)
    }
})

// update status of a category
router.patch("/", async (req, res, next) => {
    try {
        const { _id, status } = req.body
        if (!_id || !status) {
            throw new Error("Invalid dataset")
        }

        const result = await updateCategoryById(_id, { status })
        result?._id ? res.json({
            status: "success",
            message: "categories results",
            result,
        }) :
            res.json({
                status: "error",
                message: "unable to update the category, try again later",
                result
            })
    } catch (error) {
        next(error)
    }
})

export default router;