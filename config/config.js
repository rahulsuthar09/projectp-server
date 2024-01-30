const path = require('path')
const rootPath = path.normalize(__dirname + './..')
const env = process.env.NODE_ENV || 'development'

var config = {
    development: {
        port: process.env.PORT || 3000,
        redisDB: {
            'port': 6379,
            'host': 'localhost'
        }
    }
}
module.exports = config[env]