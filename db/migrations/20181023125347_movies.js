
exports.up = function (knex) {
    return knex.schema.createTable('movies', table => {
        table.increments().notNullable()
        table.timestamps(true, true)
        table.string('title').notNullable()
        table.string('director').notNullable()
        table.integer('year').notNullable()
        table.integer('rating').notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('movies')
}
