const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
username: String,
password: String,
});


// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });


// Create the User model from the schema
const User = mongoose.model('User', userSchema);
module.exports = User;