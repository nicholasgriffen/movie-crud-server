const uuid = require('uuid/v4')

const schema = {
    table: {
        columns: () => ['movie', 'rating'],
    }
}

function makeModel(resource) {
    const cache = []
    const resources = resource.replace(/(.*)/, '$1s')
    const model = {
        // C
        create: (record) => {
            record.id = uuid()

            return Promise.resolve(cache.push(record))
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
                .then(record => {
                    delete body.id
                    Object.keys(body).forEach(field => {
                        record[resource][field] = body[field]
                    })
                    return record
                })
        },
        // D
        delete: id => {
            return model.getOne(id)
                .then(record => {
                    return cache.splice(cache.indexOf(record, 1))
                })
        }
    }
    return model
}

schema.table.columns().forEach(field => {
    module.exports[field] = makeModel(field)
})