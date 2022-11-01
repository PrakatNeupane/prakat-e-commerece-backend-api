import Joi from 'joi'
import { LONGSTR, SHORTSTR, VALIDATOR } from "./constantValidation.js";

export const newCategoryValidation = (req, res, next) => {
    try {
        console.log("validation")
        const schema = Joi.object({
            _id: SHORTSTR.allow(""),
            parentCatId: SHORTSTR.allow(""),
            catName: SHORTSTR.required(),
            status: SHORTSTR.required(),
        })
        VALIDATOR(schema, req, res, next)
    } catch (error) {
        next(error) // error will be status 200 but message will be given forward
    }
}