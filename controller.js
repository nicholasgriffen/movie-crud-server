const models = require('./model')

function makeController(resource) {
    const model = models[resource]
    const controller = {
        // C
        create(req, res, next) {
            return model.create(req.body)
                .then(record => {
                    return res.status(201).send(record)
                })
                .catch(err => next({
                    status: 422,
                    message: 'Unable to process create',
                    caught: err
                }))
        },
        // R
        getAll(req, res, next) {
            return model.getAll()
                .then(records => res.status(202).send(records))
                .catch(err => next({
                    status: 404,
                    message: `${resource} not found`,
                    caught: err
                }))
        },
        getOne(req, res, next) {
            return model.getOne(+req.params.id)
                .then(record => {
                    return res.status(202).send(record)
                })
                .catch(err => next({
                    status: 404,
                    message: `${resource} not found`,
                    caught: err
                }))
        },
        // U 
        update(req, res, next) {
            return model.update(req.params.id, req.body)
                .then(record => res.status(201).send(record))
                .catch(err => next({
                    status: 422,
                    message: 'Unable to process update',
                    caught: err
                }))
        },
        delete(req, res, next) {
            return model.delete(req.params.id)
                .then(deleted => res.status(202).send(deleted))
                .catch(err => next({
                    status: 422,
                    message: 'Unable to process update',
                    caught: err
                }))

        }
    }
    return controller
}

Object.keys(models).forEach(modelName => {
    module.exports[modelName] = makeController(modelName)
})