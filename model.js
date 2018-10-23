const uuid = require('uuid/v4')

const schema = {
    columns: () => ['movie', 'rating'],
}


function makeModel(resource) {
    var cache = []
    const resources = resource.replace(/(.*)/, '$1s')
    const model = {
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
                .then(record => {
                    return model.insert(body, record.movie)
                })

                .then(record => record)
        },
        // D
        delete: id => {
            return model.getOne(id)
                .then(record => cache.splice(cache.indexOf(record.movie), 1).pop())
        },
        insert: (body, record) => {
            // Don't change record.id
            delete body.id
            // Change everything else
            Object.keys(body).forEach(field => {
                record[field] = body[field]
            })
            // Don't add a dupe
            if (cache.indexOf(record) < 0) {
                cache.push(record)
            }
            return Promise.resolve(record)
        }
    }
    return model
}
schema.columns().forEach(column => {
    module.exports[column] = makeModel(column)
})