import mongoose from 'mongoose'
const Schema = mongoose.Schema

const dataSchema = new Schema({
  updated: {
    type: String,
  },

  active: {
    type: String,
  },

  deaths: {
    type: String,
  },
  
  recovered: {
    type: String,
  },

  cases: {
    type: String,
  },
  }, {
    timestamps: true
  }
)

export default mongoose.model('Data', dataSchema)