import express, { json } from 'express'
import { encryptPassword, verifyPassword } from '../../helpers/bcrypthelper.js'
import { emailVerificationValidation, loginValidation, newAdminValidation } from '../middlewares/joi-validation/adminValidation.js'
import { getAdmin, insertAdmin, updateAdmin } from '../models/admin/Admin.model.js'
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

// user login router
router.post('/login', loginValidation, async (req, res, next) => {

    try {
        const { email, password } = req.body

        // query get user by email
        const user = await getAdmin({ email })

        if (user?._id) {
            if (user.status === "inactive")
                return res.json({
                    status: 'error',
                    message: "Your account is not active yet, please check your email and follow the instructions to activate your email"
                })


            // if user exists, compare passwords 
            const isMatched = verifyPassword(password, user.password)
            if (isMatched) {
                res.json({
                    status: "success",
                    message: "User logged in successfully",
                    user,
                })
                return
            }
            // if match, process for creating JWT later
            // for now, send login access message with user
        }
        res.status(401).json({
            status: 'error',
            message: "Invalid login credentials"
        })
        // check for authentication
    } catch (error) {
        error.status = 500
        next(error)
    }
})


export default router