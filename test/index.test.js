const chai = require('chai')
const { expect } = chai
const app = require('../index')

const body = { title: 'Digijan', year: 2018 }

chai.use(require('chai-http'))

describe('The server', () => {
    it(`
       GET /resource: 202, body.resources
    C: POST /resource: 201, body.resource 
    R: GET resource/id: 202, body.resource  
    U: PUT resource/id  201, body 
    D: DELETE resource/id 202, body.resource `, () => {
        chai.request(app)
            .post('/movies')
            .send(body)
            .then(created => {
                body.id = created.body.movie.id
                expect(created.status).to.equal(201)
                expect(created.body.movie).to.include(body)
                return chai.request(app).get('/movies/' + body.id)
            })
            .then(retrieved => {
                const update = `${new Date()}`
                expect(retrieved.status).to.equal(202)
                expect(retrieved.body.movie).to.deep.equal(body)
                return chai.request(app).put('/movies/' + body.id).send({ title: update })
            })
            .then(updated => {
                expect(updated.status).to.equal(201)
                expect(updated.body.id).to.equal(body.id)
                expect(`${new Date()}`).to.include(updated.body.title)
                return chai.request(app).delete('/movies/' + body.id)
            })
            .then(deleted => {
                expect(deleted.status).to.equal(202)
                expect(deleted.body.id).to.equal(body.id)
                return chai.request(app).get('/movies/' + body.id)
            })
            .then(retrieved => {
                expect(retrieved.status).to.equal(202)
                expect(retrieved.body.movie).to.be.undefined
            })

        chai.request(app)
            .get('/movies')
            .then(res => {
                expect(res.status).to.equal(202)
                expect(res.body.movies).to.be.ok
            })
            .catch(e => expect(e).to.equal(true))
    })
})