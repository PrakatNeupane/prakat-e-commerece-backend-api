import bcrypt from 'bcryptjs'
const saltRounds = 10

export const encryptPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds)
}