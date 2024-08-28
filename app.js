global.rootRequire = name => require(`${__dirname}/${name}`);
var express = require('express')
const config = require('./config/config.js')
const client = require('./lib/redis.js')
var dbR = rootRequire('app/models')

var app = express();
rootRequire('express')(app, config);


app.get('/health-check', async (req, res) => {
    try {
        let healthCheck = {}

        //Redis Health
        try {
            await client.connect()
            healthCheck['Redis'] = { status: 'Up', error: null }
        } catch (e) {
            console.log(e)
            healthCheck['Redis'] = { status: 'Down', error: e.msg }
        }
        res.status(200).send(healthCheck)
    } catch (error) {
        console.log(error)
        res.send({ message: 'ERROR' })
    }
})


//entry point 
async function appStart() {
    try {
        //Redis Database Connection
        await client.connect();

        // MySQL database connection
        // let prms = [dbR.sequelize.authenticate()];
        // await Promise.all(prms)

        app.listen(config.port, function () {
            console.log('Database Connected Successfully')
            console.log(`Server running at http://localhost:${config.port}`);
        })
    } catch (error) {
        console.log('App Not started ' + error)
    }
}

appStart()