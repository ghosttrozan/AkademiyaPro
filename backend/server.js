const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectToDB = require('./config/connectToDB')
const principalRoutes = require('./routes/principleRoutes')
const schoolRoutes = require('./routes/schoolRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Middleware 
app.use(cors())
app.use(express.json())

// Route handlers 

app.use("/api/v1/principal" , principalRoutes)

app.use("/api/v1/school" , schoolRoutes)
//sample routes
app.get('/', (req , res) => {
  res.send('Hello World!')
})

//start the server
app.listen(PORT , ( ) => {
  console.log("server listening on port " + PORT + "...")
  connectToDB()  //connect to MongoDB
})