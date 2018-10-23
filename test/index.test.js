const chai = require('chai')
const { expect } = chai
const app = require('../index')

const body = { title: 'Digijan', year: 2018 }
const resource = 'movie'
const route = '/movies/'

chai.use(require('chai-http'))

describe('The server', () => {
    it(`
       GET /resource: 202, body.resources
    C: POST /resource: 201, body.resource 
    R: GET resource/id: 202, body.resource  
    U: PUT resource/id  201, body 
    D: DELETE resource/id 202, body`, () => {
        chai.request(app)
            .post(route)
            .send(body)
            .then(created => {
                body.id = created.body[resource].id
                expect(created.status).to.equal(201)
                expect(created.body[resource]).to.include(body)
                return chai.request(app).get(route + body.id)
            })
            .then(retrieved => {
                const update = `${new Date()}`
                expect(retrieved.status).to.equal(202)
                expect(retrieved.body[resource]).to.deep.equal(body)
                return chai.request(app).put(route + body.id).send({ title: update })
            })
            .then(updated => {
                expect(updated.status).to.equal(201)
                expect(updated.body.id).to.equal(body.id)
                expect(`${new Date()}`).to.include(updated.body.title)
                return chai.request(app).delete(route + body.id)
            })
            .then(deleted => {
                expect(deleted.status).to.equal(202)
                expect(deleted.body.id).to.equal(body.id)
                return chai.request(app).get(route + body.id)
            })
            .then(retrieved => {
                expect(retrieved.status).to.equal(202)
                expect(retrieved.body.movie).to.be.undefined
            })

        chai.request(app)
            .get(route)
            .then(res => {
                expect(res.status).to.equal(202)
                expect(res.body.movies).to.be.ok
            })
            .catch(e => expect(e).to.equal(true))
    })
})