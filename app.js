const express = require('express')
const app = express()
const port = 3001
const {swaggerServe, swaggerSetup} = require('./app/swagger-doc/index.js')

app.use('/api-docs', swaggerServe, swaggerSetup);

app.get('/', async (req,res)=>{
    res.status(200).send({message: 'Health: Fine'})
})

app.listen(port, function(){
    console.log(`Server running at http://localhost:${port}`);
})