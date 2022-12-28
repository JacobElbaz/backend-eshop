const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const clientSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add an name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      validate: [isEmail]
    },
    password: {
      type: String,
      required: [true, 'Please add an password'],
    },
    manager: {
      type: Boolean,
    },
    wishlist: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}]
    }
  },
  {
    //automatically create and upate the field
    timestamps: true,
  }
);

//Password encryption
clientSchema.pre("save", async function(next){
  const user = this;
  if (user.isModified('password')){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

clientSchema.statics.login = async function(email, password) {
  const client = await this.findOne({ email });
  if (client) {
    const auth = await bcrypt.compare(password, client.password);
    if (auth) {
      return client;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

module.exports = mongoose.model('client', clientSchema);
