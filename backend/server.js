const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectToDB = require('./config/connectToDB')
const principalRoutes = require('./routes/principleRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Middleware 
app.use(cors())
app.use(express.json())

app.use("/api/v1" , principalRoutes)
//sample routes
app.get('/', (req , res) => {
  res.send('Hello World!')
})

//start the server
app.listen(PORT , ( ) => {
  console.log("server listening on port " + PORT + "...")
  connectToDB()  //connect to MongoDB
})