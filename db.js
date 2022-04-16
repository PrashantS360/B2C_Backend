const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://prashant360:Pr@shan1@cluster0.e6fm6.mongodb.net/B2C?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log(`Connected to mongo successfully`);
    })
}

module.exports = connectToMongo;