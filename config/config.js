const path = require('path')
const rootPath = path.normalize(__dirname + './..')
const env = process.env.NODE_ENV || 'development'

var config = {
    development: {
        port: process.env.PORT || 3000,
        mysqlDB: {
            username: process.env.MYSQL_USERNAEM || "p-user",
            password: process.env.MYSQL_PASSWORD || "ppdb0009",
            database: process.env.MYSQL_DATABASE || "projectp",
            host: process.env.MYSQL_HOST || "localhost",
            port: process.env.MYSQL_PORT || "3306",
            dialect: "mysql",
        },
        redisDB: {
            'port': 6379,
            'host': 'localhost'
        }
    }
}
module.exports = config[env]