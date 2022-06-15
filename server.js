//mongodb
require('./config/db');


const app = require('express')();
const port = 3000;
const UserRouter = require('./api/Public')

const bodyParser = require('express').json
app.use(bodyParser())

app.use('/Public',UserRouter)

app.listen(port, ()=>{
    console.log('Server Running on port',port)
})
