import ProductSchema from "./Product.schema.js";

export const insertProduct = obj => {
    return ProductSchema(obj).save()
}

export const getProduct = filter => {
    return ProductSchema.findOne(filter)
}

export const getMultipleProducts = filter => {
    return ProductSchema.find(filter)
}

export const updateProduct = (filter, updateObj) => {
    return ProductSchema.findOneAndUPdate(filter, updateObj)
}

export const deleteProduct = filter => {
    return ProductSchema.findOneAndDelete(filter)
}