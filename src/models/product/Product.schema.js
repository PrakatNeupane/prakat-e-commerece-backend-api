import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'inactive'
    }, name: {
        type: String,
        required: true,
        maxlength: 100,
    }, SKU: {
        type: String,
        unique: true,
        index: 1,
        required: true,
        maxlength: 20,
    }, slug: {
        type: String,
        unique: true,
        index: 1,
        required: true,
    }, description: {
        type: String,
        required: true,
        maxlength: 5000,
    }, qty: {
        type: number,
        required: true,
        default: 0,
    }, image: [{
        type: String,

    }], thumbnail: {
        type: String,
        required: true,
        default: "",
    }, price: {
        type: Number,
        required: true,
        default: 0,
    }, salesPrice: {
        type: Number,
        default: 0,
    }, salesDate: {
        type: Date,
        default: null,
    }, ratings: {
        type: Number,
        max: 5,
        default: 5,
    },

}, {
    timestamps: true,
})

export default mongoose.model("Product", ProductSchema)
