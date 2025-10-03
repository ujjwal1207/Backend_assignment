const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
        return ret
      }
    }
  }
)

// Static methods to match previous PostgreSQL implementation
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email }).select('+password')
}

userSchema.statics.findByIdCustom = async function (id) {
  return this.findById(id)
}

userSchema.statics.findAllUsers = async function () {
  return this.find().sort({ createdAt: -1 })
}

userSchema.statics.updateRole = async function (id, role) {
  return this.findByIdAndUpdate(id, { role }, { new: true })
}

userSchema.statics.deleteUser = async function (id) {
  await this.findByIdAndDelete(id)
  return true
}

userSchema.statics.countUsers = async function () {
  return this.countDocuments()
}

const User = mongoose.model('User', userSchema)

module.exports = User
