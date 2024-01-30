const express = require('express')
const app = express()
const config = require('./config/config.js')
const {swaggerServe, swaggerSetup} = require('./app/swagger-doc/index.js')
const client = require('./lib/redis.js')

app.use('/api-docs', swaggerServe, swaggerSetup);

app.get('/', async (req,res)=>{
    try {
        console.log('health')
        await client.set('name', 'rahul');
        let name = await client.get('name');
        res.status(200).send({message: 'Health: Fine', name: name, method: req.method})
    } catch (error) {
        console.log(error)
        res.send({message: 'ERROR'})
    }
})


//entry point 
async function appStart() {
    try {
        await client.connect()
        app.listen(config.port, function(){
            console.log(`Server running at http://localhost:${config.port}`);
        })
    } catch (error) {
        console.log('App Not started ' + error)
    }
}

appStart()