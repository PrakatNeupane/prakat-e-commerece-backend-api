import Joi from 'joi'
import { ADDRESS, DOB, EMAIL, FNAME, LNAME, PASSWORD, PHONE, REQUIREDSTR, VALIDATOR } from './constantValidation.js'

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
    VALIDATOR(schema, req, res, next)
}

export const emailVerificationValidation = (req, res, next) => {
    const schema = Joi.object({
        email: EMAIL,
        emailValidationCode: REQUIREDSTR,
    })

    VALIDATOR(schema, req, res, next)


}

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: EMAIL,
        password: PASSWORD,
    })

    VALIDATOR(schema, req, res, next)
}