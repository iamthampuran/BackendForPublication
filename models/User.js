const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicationSchema = new Schema({
    Faculties:String,
    Title:String,
    Required:String,
    DateOfApproval:Date,
    Type: String,
    SubType: String,
    PublicationName: String,
    ImpactFactor: String,
    Affiliated: String
})

const Publication = mongoose.model('Publication', PublicationSchema)

module.exports = Publication