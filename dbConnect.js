const { url } = require('inspector')
const mongoose = require('mongoose')

const URL = 'mongodb+srv://A1-pos:a1pos@cluster0.egnznty.mongodb.net/A1-pos'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successful')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})