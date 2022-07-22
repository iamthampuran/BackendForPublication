const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermPublicationSchema = new Schema({
    Year: Number,
    Title: String,
    Faculties: String,
    Type: String,
    SubType: String,
    Name: String,
    Details: String,
    ImpactFactor: String,
    Affiliated: String,
    Branch: String
})

const PermPublication = mongoose.model('Permanent Publication', PermPublicationSchema)

module.exports = PermPublication