require("dotenv").config()

import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import axios from 'axios'
import cron from 'node-cron'
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

var task = cron.schedule('0-59/25 * * * * *', async () =>  {
  console.log("again...")
  const databaseCollections = await Data.find({}).sort({ createdAt: 'desc'}).exec()
  const response = await axios.get("https://disease.sh/v3/covid-19/countries/brazil?strict=true")
  const data = response.data

  if (databaseCollections.length < 1) {
    let document = new Data({
      updated: data.updated,
      deaths: data.deaths,
      recovered: data.recovered,
      cases: data.cases,
      active: data.active
    })
    
    await document.save()
  } else {
    if (databaseCollections[0].cases !== data.cases.toString()) {
      if (databaseCollections.length > 9) {
        await Data.deleteOne({ _id: databaseCollections[databaseCollections.length - 1]._id }).exec()
        
        let document = new Data({
          updated: data.updated,
          deaths: data.deaths,
          recovered: data.recovered,
          cases: data.cases,
          active: data.active
        })
        
        await document.save()
      } else {
        let document = new Data({
          updated: data.updated,
          deaths: data.deaths,
          recovered: data.recovered,
          cases: data.cases,
          active: data.active
        })
        
        await document.save()
      }
    }
  }
}, {
  scheduled: false
});

task.start();

app.get("/", async ( req: Request, res: Response ) => {
  const collectionsToReturn = await Data.find({}).sort({ createdAt: 'desc'}).exec()
  
  if (!collectionsToReturn) {
    return res.status(400).json({
      error: "information not found"
    })
  }
  else {
    return res.status(200).json({
      message: collectionsToReturn
    })
  }
})

app.listen(port, () => {
  console.log(`run in ${port}`)
})