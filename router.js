const { Router } = require('express')
const controllers = require('./controller')

function makeRouter(resource) {
    const controller = controllers[resource]
    const router = Router()
    // C
    router.post('/', controller.create)
    // R
    router.get('/', controller.getAll)
    router.get('/:id', controller.getOne)
    // U
    router.put('/:id', controller.update)
    // D
    router.delete('/:id', controller.delete)

    return router
}

module.exports.resources = []

Object.keys(controllers).forEach(controllerName => {
    module.exports[controllerName] = makeRouter(controllerName)
    module.exports.resources.push(controllerName)
})

module.exports.mount = function (router, app) {
    router.resources.forEach(resource => app.use(`/${resource}`, router[resource]))
}