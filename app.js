const express = require('express')
const app = express()
const port = 3001

app.get('/', async (req,res)=>{
    res.status(200).send({message: 'Health: Fine'})
})

app.listen(port, function(){
    console.log(`Server running at http://localhost:${port}`);
})