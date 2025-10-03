const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id
        ret.user_id = ret.userId // For backward compatibility
        delete ret._id
        delete ret.__v
        delete ret.userId
        return ret
      }
    }
  }
)

// Indexes for common queries
taskSchema.index({ userId: 1, createdAt: -1 })
taskSchema.index({ status: 1 })
taskSchema.index({ priority: 1 })

// Static methods to match previous PostgreSQL implementation
taskSchema.statics.findByUserId = async function (userId, filters = {}) {
  const query = { userId }

  if (filters.status) {
    query.status = filters.status
  }

  if (filters.priority) {
    query.priority = filters.priority
  }

  let queryBuilder = this.find(query).sort({ createdAt: -1 })

  if (filters.limit) {
    queryBuilder = queryBuilder.limit(parseInt(filters.limit))
  }

  if (filters.offset) {
    queryBuilder = queryBuilder.skip(parseInt(filters.offset))
  }

  return queryBuilder
}

taskSchema.statics.updateTask = async function (id, updates) {
  return this.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
}

taskSchema.statics.deleteTask = async function (id) {
  await this.findByIdAndDelete(id)
  return true
}

taskSchema.statics.countByUserId = async function (userId) {
  return this.countDocuments({ userId })
}

taskSchema.statics.findAllTasks = async function () {
  return this.find().sort({ createdAt: -1 })
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
