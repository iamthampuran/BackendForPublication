const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermPublicationSchema = new Schema({
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

const PermPublication = mongoose.model('Permanent Publication', PermPublicationSchema)

module.exports = PermPublication