
exports.up = function (knex) {
    return knex.schema.createTable('movies', table => {
        table.increments()
        table.timestamps(true, true)
        table.string('title').notNullable()
        table.string('director').notNullable()
        table.integer('year').notNullable()
        table.integer('rating').notNullable()
        table.string('posterUrl')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('movies')
}
