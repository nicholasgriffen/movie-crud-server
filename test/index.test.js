const chai = require('chai')
const { expect } = chai
const app = require('../index')
const knex = require('../db/knex')


const body = {
    title: 'digijan',
    year: 2017,
    director: 'Griff',
    rating: 5,
}
const resource = 'movie'
const route = '/movies/'
const update = `${new Date()}`

chai.use(require('chai-http'))

describe('server', () => {
    before(() => {
        const config = {
            directory: './db/migrations'
        }
        return knex.migrate.rollback(config)
            .then(() => knex.migrate.latest(config))
    })
    it(`
       GET /resource: 202, body.resources
    C: POST /resource: 201, body.resource 
    R: GET resource/id: 202, body.resource  
    U: PUT resource/id  201, body 
    D: DELETE resource/id 202, body`, () => {
        return chai.request(app).get(route)
            .then(res => {
                expect(res.status).to.equal(202)
                expect(res.body.movies).to.be.ok
                return chai.request(app).post(route).send(body)
            })
            .then(created => {
                body.id = created.body[resource].id
                expect(created.status).to.equal(201)
                expect(created.body[resource]).to.include(body)
                return chai.request(app).get(route + body.id)
            })
            .then(retrieved => {
                expect(retrieved.status).to.equal(202)
                expect(retrieved.body.movie).to.include(body)
                return chai.request(app).put(route + body.id).send({ title: update })
            })
            .then(updated => {
                expect(updated.status).to.equal(201)
                expect(updated.body.movie.id).to.equal(body.id)
                expect(updated.body.movie.title).to.include(update)
                return chai.request(app).delete(route + body.id)
            })
            .then(deleted => {
                expect(deleted.status).to.equal(202)
                expect(deleted.body.id).to.equal(body.id)
                return deleted.body.id
            })
            .then(id => chai.request(app).get(route + id))
            .then(retrieved => {
                expect(retrieved.status).to.equal(202)
                return expect(retrieved.body.movie).to.be.undefined
            })
    })
})