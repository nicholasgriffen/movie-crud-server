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
            [resource]: cache.find(record => {
                return record.id === id
            }
            )
        }),
        // U 
        update: (id, columns) => {
            return model.getOne(id)
                .then(resource => {
                    columns.forEach(column => {
                        resource[column.name] = resource[column.value]
                    })
                    return resource
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