const swaggerUI = require('swagger-ui-express')
const swaggerJsDocs = require('swagger-jsdoc')

const options ={
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'ProjectP Documentation',
            description: 'Documentation of APIs',
            termsOfService: '',
            contact: {
                name: 'rahulsuthar',
                email: 'rahulsuthar1911@gmail.com'
            },
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Dev Server'
            },
            {
                url: 'http://www.projectp.com',
                description: 'Production Server'
            }
        ]
    },
    apis: ['../routes/*.js']
}

module.exports = {swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJsDocs(options))};