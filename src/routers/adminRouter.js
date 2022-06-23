import express from 'express'
import { newAdminValidation } from '../middlewares/adminValidation.js'
import { insertAdmin } from '../models/Admin.model.js'
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "GET got hit to the admin router"
    })
})

router.post('/', async (req, res) => {
    const result = await insertAdmin(req.body)
    res.json({
        status: 'success',
        message: 'POST got hit to the admin router',
        result,
    })
})
router.patch('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'PATCH got hit to the admin router'
    })
})

export default router