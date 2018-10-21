const express = require('express')

function makeRouter(resource) {
    const controller = require('./controller')[resource]
    const router = express.Router()

    router.get('/', controller.getAll)

    router.post('/', controller.create)

    return router
}

Object.keys(require('./controller')).forEach(controllerName => {
    module.exports[controllerName] = makeRouter(controllerName)
})