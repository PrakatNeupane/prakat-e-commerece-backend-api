import CategorySchema from "./Category.schema.js";

export const insertCategory = obj => {
    return CategorySchema(obj).save()
}

export const getOneCategory = filter => {
    return CategorySchema.findOne(filter)
}
// export const getCategories = filter => {
//     return CategorySchema.find(filter)
// }

export const getAllCategories = () => {
    return CategorySchema.find();
};

export const deleteCatById = _id => {
    return CategorySchema.findByIdAndDelete(_id)
}
export const updateCategoryById = (_id, updateObj) => {
    return CategorySchema.findByIdAndUpdate(_id, updateObj, { new: true })
}