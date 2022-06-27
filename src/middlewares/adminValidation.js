import Joi from 'joi'

export const newAdminValidation = (req, res, next) => {
    const schema = Joi.object({
        fName: Joi.string().alphanum().required().min(3).max(20),
        lName: Joi.string().required().min(3).max(20),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        phone: Joi.string().required().min(10).max(15),
        dob: Joi.date().allow(null),
        address: Joi.string().allow(null).allow(""),
        password: Joi.string().required(),
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
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        emailValidationCode: Joi.string().required(),
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