const cache = {}
const resources = ['movie', 'rating']

function makeModel(resource) {
    const plural = resource.replace(/(.*)/, '$1s')
    cache[resource] = []

    const model = {
        getAll: () => Promise.resolve({ [plural]: cache[resource] }),
        create: (record) => {
            cache[resource].push(record)

            return Promise.resolve({
                [resource]: cache[resource].slice(-1).pop()
            })
        }
    }
    return model
}

resources.forEach(resource => {
    module.exports[resource] = makeModel(resource)
})