const { createClient } = require('redis')
const config = require('../config/config')

const redisClient = createClient(config.redisDB) 

redisClient.on('error', function (err) {
    if (err.code === 'ECONNREFUSED') {
        console.log('Please recheck redis connection')
        console.log('Redis ' + err)
        redisClient.disconnect()
    }else{
        console.log('Error in redis client ' + err)
    }
})
redisClient.on('connect', function(){
    console.log('Redis Connected')
})
module.exports = redisClient;