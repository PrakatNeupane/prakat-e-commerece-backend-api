import AdminSchema from "./Admin.schema";

export const insertAdmin = obj => {
    return AdminSchema(obj).save()
}
export const getAdminById = _id => {
    return AdminSchema.findById(_id)
}
export const getAdmin = filter => {
    return AdminSchema.findOne(filter)
}
export const updateAdmin = (filter, obj) => {
    return AdminSchema.findOneAndUpdate(filter, obj, { new: true })
}