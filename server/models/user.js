import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../core/config/config.dev';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { collection: 'users' });

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(parseInt(config.SALT_WORK_FACTOR, 10), (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) return next(err1);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.comparePasswordPromise = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      resolve(isMatch);
    });
  });
};

UserSchema.methods.genToken = function () {
  return this.email;
};

if (!UserSchema.options.toObject) UserSchema.options.toObject = {};

UserSchema.options.toObject.transform = (doc, ret) => {
  return {
    email: ret.email,
    username: ret.username,
  };
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
