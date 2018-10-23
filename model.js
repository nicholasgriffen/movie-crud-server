const uuid = require('uuid/v4')

const schema = {
    columns: () => ['movie', 'rating'],
}


function makeModel(resource) {
    var cache = []
    const resources = resource.replace(/(.*)/, '$1s')
    const model = {
        name: resource,
        // C
        create: body => {
            const record = { id: uuid() }

            return model.insert(body, record)
                .then(function () { return { [resource]: record } })
        },
        // R
        getAll: () => Promise.resolve({
            [resources]: cache
        }),

        getOne: id => Promise.resolve({
            [resource]: cache.find(record => record.id === id)
        }),
        // U 
        update: (id, body) => {
            return model.getOne(id)
                .then(record => model.insert(body, record))
                .then(record => record)
        },
        // D
        delete: id => {
            return model.getOne(id)
                .then(record => cache.splice(cache.indexOf(record.movie), 1))
        },
        insert: (body, record) => {
            delete body.id

            Object.keys(body).forEach(field => {
                record[field] = body[field]
            })
            cache.push(record)
            return Promise.resolve(record)
        }
    }
    return model
}
schema.columns().forEach(column => {
    module.exports[column] = makeModel(column)
})