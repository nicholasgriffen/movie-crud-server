const cache = {}
const resources = ['movie']

function makeModel(resource) {
    const plural = resource.replace(/(.*)/, '$1s')
    cache[resource] = []

    const model = {
        getAll: () => Promise.resolve({ [plural]: cache[resource] }),
        create: (record) => {
            cache[resource].push(record)
            return Promise.resolve({
                [resource]: cache[resource][cache[resource].length - 1]
            })
        }
    }
    return model
}

resources.forEach(resource => {
    module.exports[resource] = makeModel(resource)
})