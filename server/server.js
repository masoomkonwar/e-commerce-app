const express = require('express')
const cors = require('cors')
const api = require('./routes/api')
const bodyParser = require('body-parser')
const orders = require('./routes/orders')
const Auth = require('./routes/auth')
const users = require('./routes/users')
const app = express()
const PORT = 3300

const jsonParser = bodyParser.json()
app.use(cors())
app.use('/api/auth',jsonParser,Auth)
app.use('/api',api)
app.use('/api/orders',jsonParser,orders)
app.use('/api/users/validate',jsonParser,users)



app.get('/',(req,res)=>{
    res.send("Hello from the server")
});

app.listen(PORT,()=>{
    console.log("server is listening at port number "+PORT)
});