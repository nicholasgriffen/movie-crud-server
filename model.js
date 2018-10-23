const schema = {
    table: {
        colNames: () => ['movie', 'rating']
    }
}

function makeModel(resource) {
    const cache = []
    const resources = resource.replace(/(.*)/, '$1s')
    const model = {
        // C
        create: (record) => {
            record.id = cache.length + 1
            cache.push(record)

            return Promise.resolve({
                [resource]: cache.slice(-1).pop()
            })
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

schema.table.colNames().forEach(field => {
    module.exports[field] = makeModel(field)
})