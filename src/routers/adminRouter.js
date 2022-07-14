import express, { json } from 'express'
import { encryptPassword } from '../../helpers/bcrypthelper.js'
import { emailVerificationValidation, newAdminValidation } from '../middlewares/adminValidation.js'
import { insertAdmin, updateAdmin } from '../models/Admin.model.js'
import { v4 as uuidv4 } from 'uuid'
import { uuid } from 'uuidv4'
import { sendMail } from '../../helpers/emailHelper.js'
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

        // create unique email validation code
        req.body.emailValidationCode = uuidv4()

        const result = await insertAdmin(req.body)

        console.log(result)
        console.log(result?.emailValidationCode)


        if (result?._id) {
            // create unique url and send it to the user email
            const url = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`
            console.log(result.emailValidationCode)
            // send email to the user
            sendMail({ fName: result.fName, url })

            res.json({
                status: 'success',
                message: 'New admin created successfully',
                // result,
            })
        }
        else {
            res.json({
                status: 'error',
                message: 'Unable to create new admin, please try again later or contact the admin',
            })
        }

    } catch (error) {
        error.status = 500
        if (error.message.includes('E11000 duplicate key error')) {
            error.message = "Email already exists"
            error.status = 200
        }
        next(error)
    }
})

// email verification router

router.post('/email-verification', emailVerificationValidation, async (req, res) => {
    console.log(req.body)
    const filter = req.body
    const update = { status: "active" }

    const result = await updateAdmin(filter, update)
    console.log(result)

    result?._id ?
        res.json({
            status: "success",
            message: "email successfully verified, you may login now"
        }) :
        res.json({
            status: "error",
            message: "invalid or expierd verification link"
        })
})

router.patch('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'PATCH got hit to the admin router'
    })
})

export default router