const mongoose = require('mongoose');
const config = require('config')

const db = config.get('mongoURI');
//Connecting mongoDB
const connectDB=async()=>{
    try {
       await mongoose.connect(db,{
        useUnifiedTopology: true,
        useNewUrlParser:true ,
        useCreateIndex:true 
       });
       console.log("MongoDB connected...")
        
    } catch (error) {
        console.error(error.message);
        
    }
    
}
module.exports = connectDB;