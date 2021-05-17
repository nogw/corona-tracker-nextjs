require("dotenv").config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import axios from 'axios'
import Data from './models/data.model'

const app = express()
const port = process.env.PORT || 8000
const MG_URI = process.env.MG_URI

app.use(express.json())
app.use(helmet())
app.use(cors())

mongoose.connect(MG_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const db = mongoose.connection

db.on("error", () => {
  console.error.bind(console, "connection error:")
})

db.once("open", () => {
  console.log("database connect")
})

// TODO: create method to auto-execute function to get infos of corona virus

app.get("/", async ( req: Request, res: Response ) => {
  let dataDb: any = await Data.find({}).sort({ createdAt: 'desc'}).exec()
  
  const response = await axios.get("https://disease.sh/v3/covid-19/countries/brazil?strict=true")
  const data = response.data

  if (dataDb.length < 1) {
    let dataDbAdd = new Data({
      updated: data.updated,
      deaths: data.deaths,
      recovered: data.recovered,
      cases: data.cases,
      active: data.active
    })

    dataDbAdd.save()
    .then( async (dataRes: any) => {
      let database_data: any = await Data.find({}).sort({ createdAt: 'desc'}).exec()
      
      return res.status(200).json({
        message: database_data
      })
    })
    .catch((error: any) => {
      return res.status(400).json({
        error: error 
      })
    })
  } else {
    if (dataDb[0].cases !== data.cases.toString()) {
      if ( dataDb.length > 9 ) {
        await Data.deleteOne({ _id: dataDb[dataDb.length - 1]._id }).exec()

        let dataDbAdd = new Data({
          updated: data.updated,
          deaths: data.deaths,
          recovered: data.recovered,
          cases: data.cases,
          active: data.active
        })

        dataDbAdd.save()
        .then( async (dataRes: any) => {
          let database_data: any = await Data.find({}).sort({ createdAt: 'desc'}).exec()

          return res.status(200).json({
            message: database_data
          })
        })
        .catch((error: any) => {
          return res.status(400).json({
            error: error 
          })
        })
      } else {
        let dataDbAdd = new Data({
          updated: data.updated,
          deaths: data.deaths,
          recovered: data.recovered,
          cases: data.cases,
          active: data.active
        })

        dataDbAdd.save()
        .then((dataRes: any) => {
          return res.status(200).json({
            message: Data.find({}).sort({ createdAt: 'desc'})
          })
        })
        .catch((error: any) => {
          return res.status(400).json({
            error: error 
          })
        })
          }
        } else {
          return res.status(200).json({
            size: dataDb.length,
            message: dataDb
          })
        }
  }
})

app.listen(port, () => {
  console.log(`run in ${port}`)
})