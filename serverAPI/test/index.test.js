const controller = require('../controller/index.js');
const index = require('../index.js');
const supertest = require('supertest');
const app = index.app;
const request = supertest(app);

describe('Reviews', () => {

  afterAll(done => {
    app.close()
    done()
  })

  // Reviews
  it('should get data from database', async done => {
    const response = await request.get('/reviews/test')
    expect(response.status).toBe(200)
    // cosnole.log()
    // it('should retrieve the review table data', () => {
      // expect(response.result)
    // })
    done()
  })

  // Meta
  // it('should get meta data from database', async done => {
    // expect()
    // done();
  // })

  // post
  // it('should get post a review into database', async done => {
    // expect()
    // done();
  // })


})