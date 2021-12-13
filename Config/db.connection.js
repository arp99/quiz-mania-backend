const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try{
        await mongoose.connect(process.env.DB_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('Successfully connected to database')
    }catch(err){
        console.log({ message: "Error in connecting to database" , errorMessage: err.message })
    }
}
module.exports = { connectToDatabase }