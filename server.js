require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use(express.static('public'))





app.use('/api', require('./routes/api'))


app.get('/', (req,res)=>{
  res.sendFile('index.html')
})

app.listen(process.env.PORT, ()=> console.log("Server started"))