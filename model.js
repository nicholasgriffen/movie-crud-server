const dbs = require('./db')

function makeModel(resources) {
    const db = dbs[resources]
    var cache = []
    let resource = resources.replace(/(.*)s/, '$1')
    let model = {
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
        getAll: () => {
            return db.load()
                .then(records => {
                    cache = records
                    return { [resources]: records }
                })
                .catch(e => {
                    return { error: e, [resources]: cache }
                })
        },

        getOne: id => {
            return db.load(id)
                .then(record => {
                    cache.push(record)
                    return { [resource]: record }
                })
                .catch(e => {
                    return Promise.resolve({ error: e, [resource]: cache.find(record => record.id === id) })
                })
        },
        // U 
        update: (id, body) => {
            return db.load(id)
                .then(loaded => model.insert(body, loaded))
                .then(updated => db.save(updated))
                .then(record => {
                    return model.getOne(record)
                })
        },
        // D
        delete: id => {
            return model.getOne(id)
                .then(record => {
                    db.delete(id)
                    return record
                })
                .then(record => {
                    return cache.splice(cache.indexOf(record.movie), 1).pop()
                })
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
Object.keys(dbs).forEach(db => {
    module.exports[db] = makeModel(db)
})