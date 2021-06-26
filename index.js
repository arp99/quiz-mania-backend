const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5500
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors())

app.get("/",(req , res)=>{
    res.json("Hello from other side");
})

app.listen(PORT , ()=>{
    console.log(`Server connected successfully at Port: ${PORT}`);
})