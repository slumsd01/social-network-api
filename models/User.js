const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: {},
    email: {},
})

const User = model('User', UserSchema)

module.exports = User;