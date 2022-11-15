import express from 'express'
import { newProductValidation } from '../middlewares/joi-validation/productCategoryValidation.js'
import { insertProduct } from '../models/product/Product.model.js'
import slugify from "slugify"

const router = express.Router()

router.post('/', newProductValidation, async (req, res, next) => {
    try {
        console.log(req.body, "displaying from productRouter")
        const { name } = req.body
        const slug = slugify(name, { trim: true, lower: true })
        req.body.slug = slug
        const result = await insertProduct(req.body)
        result?._id ? res.json({
            status: "Success",
            message: "New product has been created"
        }) : res.json({
            status: "Error",
            message: "Error! Unable to create new product"
        })
    } catch (error) {
        // duplicate slug and sku
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "Another product with same name or sku exists"
            error.status = 200;
        }
        console.log(error)
        next(error)
    }
})

export default router