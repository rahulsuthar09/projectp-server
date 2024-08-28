var express = require('express');

//rate limiter
const rateLimiterMiddleware = require('./app/middlewares/rateLimiter.js')

const { swaggerServe, swaggerSetup } = require('./app/swagger-doc/index.js')

module.exports = function (app, config) {

    /*
        global rate limiting
        app.use(rateLimiterMiddleware)

        API throttling (api level  rate limiting)
        app.get('/', rateLimiterMiddleware, async (req, res) => {res.send({'msg': 'health fine'})})

    */

    //swagger api documentation
    app.use('/api-docs', swaggerServe, swaggerSetup);

}