const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicationSchema = new Schema({
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

const Publication = mongoose.model('Publication', PublicationSchema)

module.exports = Publication