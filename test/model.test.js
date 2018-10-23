const { expect } = require('chai')
const movies = require('../model').movie
const movie = { title: 'digijan', year: 2017 }

describe('model', () => {

    describe('implements CRUD', () => {
        it('Creates, Retrieves, Updates, Deletes', () => {
            return movies.create(movie)
                .then(created => {
                    expect(created.movie).to.include(movie)
                    movie.id = created.movie.id
                    return movies.getOne(created.movie.id)
                })
                .then(retrieved => {
                    expect(retrieved.movie).to.include(movie)
                    return movies.update(movie.id, { title: `${new Date()}` })
                })
                .then(updated => {
                    expect(`${new Date()}`).to.include(updated.title)
                    expect(updated.id).to.equal(movie.id)
                    return movies.delete(movie.id)
                })
                .then(deleted => {
                    expect(deleted.id).to.equal(movie.id)
                    return movies.getOne(deleted.id)
                        .then(retrieved => {
                            expect(retrieved).to.have.own.property('movie')
                            expect(retrieved.movie).to.be.undefined
                        })
                })
        })

        describe('#getAll', () => {
            it('returns a .${resources} object', () => {
                return movies.getAll()
                    .then(records => expect(records).to.be.have.own.property('movies'))
            })
        })

    })
})