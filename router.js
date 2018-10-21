const { Router } = require('express')
const controllers = require('./controller')

function makeRouter(resource) {
    const controller = controllers[resource]
    const router = Router()

    router.get('/', controller.getAll)

    router.post('/', controller.create)

    return router
}

Object.keys(require('./controller')).forEach(controllerName => {
    module.exports[controllerName] = makeRouter(controllerName)
})