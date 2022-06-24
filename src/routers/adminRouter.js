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

    // try {
    //     const hashPassword = encryptPassword(req.body.password)
    //     req.body.password = hashPassword

    //     // create a unique email validation code
    //     req.body.emailValidationCode = uuidv4()
    //     const result = await insertAdmin(req.body)
    //     console.log(result)

    //     if (result?._id) {
    //         // create a unique url and send it to the user email

    //     }
    // } catch (error) {

    // }
    const hashPassword = encryptPassword(req.body.password)

    res.json({
        status: 'success',
        message: 'POST got hit to the admin router',
        hashPassword
        // result,
    })
})
router.patch('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'PATCH got hit to the admin router'
    })
})

export default router