import mongoose, { Document, Schema } from 'mongoose'

export interface IData extends Document {
  updated: string,
  deaths: string,
  recovered: string,
  cases: string,
  active: string
};

const dataSchema = new Schema<IData>({
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