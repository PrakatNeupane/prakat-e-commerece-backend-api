import express from 'express'
import { newProductValidation } from '../middlewares/joi-validation/productCategoryValidation.js'

const router = express.Router()

router.post('/', newProductValidation, (req, res, next) => {
    try {
        console.log(req.body, "displaying from productRouter")
        res.json({
            status: 'success',
            message: 'todo',
        })
    } catch (error) {
        next(error)
    }
})

export default router