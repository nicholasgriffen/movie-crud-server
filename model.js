const db = require('./db')

function makeModel(resources) {
    var cache = []
    const resource = resources.replace(/(.*)s/, '$1')
    const model = {
        // C
        create: body => {
            const record = {}

            return model.insert(body, record)
                .then(record => db.save(record))
                .then(id => {
                    record.id = id
                    return { [resource]: record }
                })
                .catch(e => {
                    return { error: e, [resource]: record }
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
Object.keys(db).forEach(table => {
    module.exports[table] = makeModel(table)
})