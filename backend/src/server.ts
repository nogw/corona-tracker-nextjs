require("dotenv").config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import axios from 'axios'

const app = express()
const port = process.env.PORT || 8000
const MG_URI = process.env.MG_URI
let dataNow: any

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

const listen = async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries/brazil?strict=true")
  const data = response.data
  console.log(data)
};

setInterval(listen, 10000)

app.get("/", ( req: Request, res: Response ) => {
  res.send(dataNow)
})

app.listen(port, () => {
  console.log(`run in ${port}`)
})