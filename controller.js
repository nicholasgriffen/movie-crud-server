function makeController(resource) {
    const resources = require('./model')[resource]
    const controller = {
        create: (req, res, next) => {
            return resources.create(req.body)
                .then(record => {
                    return res.status(201).send(record)
                })
                .catch(err => next({ status: 422, message: 'Unable to process create', caught: err }))
        },
        getAll: (req, res, next) => {
            return resources.getAll()
                .then(records => res.status(205).send(records))
                .catch(err => next({ status: 404, message: `${resource} not found`, caught: err }))
        },
    }
    return controller
}

Object.keys(require('./model')).forEach(modelName => {
    module.exports[modelName] = makeController(modelName)
})