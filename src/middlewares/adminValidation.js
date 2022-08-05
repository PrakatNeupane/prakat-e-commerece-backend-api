import Joi from 'joi'
import { ADDRESS, DOB, EMAIL, FNAME, LNAME, PASSWORD, PHONE, REQUIREDSTR } from './constantValidation.js'


export const newAdminValidation = (req, res, next) => {
    const schema = Joi.object({
        fName: FNAME,
        lName: LNAME,
        email: EMAIL,
        phone: PHONE,
        dob: DOB,
        address: ADDRESS,
        password: PASSWORD,
    })
    const { value, error } = schema.validate(req.body)
    console.log(error?.message)

    if (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
    next()
}

export const emailVerificationValidation = (req, res, next) => {
    const schema = Joi.object({
        email: EMAIL,
        emailValidationCode: REQUIREDSTR,
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.json({
            status: 'error',
            message: error.message
        })
    }
    next()

}

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: EMAIL,
        password: PASSWORD,
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.json({
            status: 'error',
            message: error.message,
        })
    }
    next()
}