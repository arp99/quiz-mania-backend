const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { connectToDatabase } = require('./Config/db.connection')

const loginRouter = require('./Routers/login.router')
const signupRouter = require('./Routers/signup.router')
const quizRouter = require('./Routers/quiz.router')
const userRouter = require('./Routers/user.router')

const PORT = process.env.PORT || 5500

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors())

connectToDatabase()

app.use( '/api/login' , loginRouter )
app.use( '/api/signup' , signupRouter )
app.use( '/api/quizes' , quizRouter )
app.use( '/api/user' , userRouter )

app.get("/",(req , res)=>{
    res.json("Hello from other side");
})

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Not Found!' });
});
  
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Error occurred on server side!', errMessage: err.message });
});

app.listen(PORT , ()=>{
    console.log(`Server connected successfully at Port: ${PORT}`);
})