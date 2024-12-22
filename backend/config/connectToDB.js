const mongoose = require("mongoose");

//Connect To Database

module.exports = async function connectToDB() {

    mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to MongoDB")).catch((error) => console.log('MongoDB connection error ',error))
    
}
