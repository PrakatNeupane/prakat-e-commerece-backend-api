import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'inactive',
    },
    fName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [20, 'First Name must be less than 20 characters']
    },
    lName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [20, 'Last Name must be less than 20 characters']
    },
    dob: {
        type: Date,
        default: null,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, 'Email must be less than 50 characters'],
        unique: true,
        index: 1,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxLength: [15, 'Phone must be less than 20 characters'],
        minLength: [10, 'Phone must be at least 10 characters'],
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: 'n/a',
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model('Admin', AdminSchema)