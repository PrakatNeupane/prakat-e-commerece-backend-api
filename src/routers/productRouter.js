import express from 'express'
import { newProductValidation } from '../middlewares/joi-validation/productCategoryValidation.js'
import { getMultipleProducts, insertProduct, deleteProduct, deleteMultipleProducts } from '../models/product/Product.model.js'
import slugify from "slugify"

const router = express.Router()

router.post('/', newProductValidation, async (req, res, next) => {
    try {
        console.log(req.body, "displaying from productRouter")
        const { name } = req.body
        const slug = slugify(name, { trim: true, lower: true })
        req.body.slug = slug
        const result = await insertProduct(req.body)
        console.log(result)
        result._id ? res.json({
            status: "success",
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
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const result = await getMultipleProducts()
        res.json({
            status: 'success',
            message: 'products result',
            result
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        const ids = req.body
        if (ids.length) {
            const result = await deleteMultipleProducts(ids)
            console.log(result)
            console.log(result.deletedCount)
            if (result?.deletedCount) {
                return res.json({
                    status: 'success',
                    message: 'Selected product has been deleted'
                })
            }
        }
        res.json({
            status: 'error',
            message: 'Unable to delete the product, please try again later'
        })
    } catch (error) {
        next(error)
    }
})

export default router