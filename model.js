const cache = {}
const resources = ['movie', 'rating']

function makeModel(resource) {
    const plural = resource.replace(/(.*)/, '$1s')
    cache[resource] = []

    const model = {
        // C
        create: (record) => {
            cache[resource].push(record)

            return Promise.resolve({
                [resource]: cache[resource].slice(-1).pop()
            })
        },
        // R
        getAll: () => Promise.resolve({ [plural]: cache[resource] }),

        getOne: id => Promise.resolve({ [resource]: cache[resource][id] }),
        // U 
        update: (id, columns) => {
            model.getOne(id)
                .then(resource => {
                    columns.forEach(column => {
                        resource[column.name] = resource[column.value]
                    })
                    return resource
                })
        },
        // D
        delete: id => {
            const copy = Object.create(cache[resource][id])
            if (delete cache[resource][id]) {
                return Promise.resolve(copy)
            } else {
                Promise.reject(new Error('model.delete failed'))
            }
        }
    }
    return model
}

resources.forEach(resource => {
    module.exports[resource] = makeModel(resource)
})