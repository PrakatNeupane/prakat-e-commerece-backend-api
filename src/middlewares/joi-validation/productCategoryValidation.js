import Joi from 'joi'
import { LONGSTR, SHORTSTR, VALIDATOR } from "./constantValidation.js";

export const newCategoryValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            parentCat: SHORTSTR.allow(""),
            catName: SHORTSTR.required()
        })
        VALIDATOR(schema, req, res, next)
    } catch (error) {
        next(error) // error will be status 200 but message will be given forward
    }
}