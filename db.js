const knex = require('./db/knex')

const schema = {
    tables: () => ['movies'],
}

function makeDb(resource) {
    const db = {
        save: record => {
            if (record.id) {
                console.log('db save record', record)
                return knex(resource)
                    .where('id', +record.id)
                    .update(record)
                    .returning('id')
                    .then(updated => updated[0])
                    .catch(e => Promise.reject(e))
            }
            return knex(resource)
                .insert(record)
                .returning('id')
                .then(id => id[0])
                .catch(e => Promise.reject(e))
        },
        load: id => {
            if (!id) return knex(resource)
            return knex(resource)
                .select('*')
                .where('id', +id)
                .then(loaded => loaded[0])
                .catch(e => Promise.reject(e))
        },
        delete: id => {
            return knex(resource)
                .where('id', +id)
                .del()
                .returning('id')
                .then(id => id[0])
                .catch(e => Promise.reject(e))
        }
    }
    return db
}

schema.tables().forEach(table => {
    module.exports[table] = makeDb(table)
})

module.exports.knex = knex