const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Middleware 
app.use(cors())
app.use(express.json())

//Connect To Database
mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to MongoDB")).catch((error) => console.log('MongoDB connection error ',error))

//sample routes
app.get('/', (req , res) => {
  res.send('Hello World!')
})

//start the server
app.listen(PORT , ( ) => {
  console.log("server listening on port " + PORT + "...")
})