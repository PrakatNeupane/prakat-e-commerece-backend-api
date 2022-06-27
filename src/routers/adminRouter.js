import express from 'express'
import { encryptPassword } from '../../helpers/bcrypthelper.js'
import { newAdminValidation } from '../middlewares/adminValidation.js'
import { insertAdmin } from '../models/Admin.model.js'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "GET got hit to the admin router"
    })
})

router.post('/', newAdminValidation, async (req, res, next) => {
    try {
        const hashPassword = encryptPassword(req.body.password)
        req.body.password = hashPassword // assigning the value of password in the object to hashPassword so that the database does not show the real password
        const result = await insertAdmin(req.body)

        console.log(result)

        result?._id ?
            res.json({
                status: 'success',
                message: 'New admin created successfully',
            })
            : res.json({
                status: 'error',
                message: 'Unable to create new admin, please try again later or contact the admin',
            })

    } catch (error) {
        error.status = 500
        if (error.message.includes('E11000 duplicate key error')) {
            error.message = "Email already exists"
            error.status = 200
        }
        next(error)
    }


})
router.patch('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'PATCH got hit to the admin router'
    })
})

export default router