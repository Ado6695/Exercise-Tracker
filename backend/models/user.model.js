const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//userSchema is name which has single field username and type,required etc are validations.
//trim is used for removing whitespace off the end if someone mistakenly types in some spaces
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

//User is any name which is passed
const User = mongoose.model('User', userSchema);

module.exports = User;