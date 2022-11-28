import Joi from 'joi'
import { LONGSTR, SHORTSTR, VALIDATOR, PRICE, DATE, QTY } from "./constantValidation.js";

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

export const newProductValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            _id: SHORTSTR.allow(""),
            status: SHORTSTR,
            name: SHORTSTR.required(),
            sku: SHORTSTR.required(),
            description: LONGSTR.required(),
            qty: QTY.required(),
            price: PRICE.required(),
            salesPrice: PRICE,
            salesStartDate: DATE.allow(null),
            salesEndDate: DATE.allow(null),
            catId: SHORTSTR.required()
        })
        VALIDATOR(schema, req, res, next)
    } catch (error) {
        next(error) // error will be status 200 but message will be given forward
    }
}

