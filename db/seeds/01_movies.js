
exports.seed = function (knex) {
    return knex('movies').del()
        .then(() => {
            return knex('movies').insert([
                {
                    id: 1,
                    title: 'digijan',
                    year: 2017,
                    director: 'Griff',
                    rating: 3,
                },
                {
                    id: 2,
                    title: 'more digijan',
                    year: 2014,
                    director: 'Nick',
                    rating: 5,
                },
                {
                    id: 3,
                    title: 'too much digijan',
                    year: 2010,
                    director: 'Nick',
                    rating: 8,
                },
            ])
        })
        .then(() => {
            return knex.raw(
                'SELECT setval(\'movies_id_seq\', (SELECT MAX(id) FROM movies));'
            )
        })
}
