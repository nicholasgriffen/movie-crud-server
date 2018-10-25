
exports.up = function (knex) {
    return knex.schema.createTable('movies', table => {
        table.increments()
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('created_at').defaultTo(knex.fn.now())
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
