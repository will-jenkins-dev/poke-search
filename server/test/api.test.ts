import request from 'supertest'
import app from '../src/app'

describe('GET /api', () => {
  it('should return 400', () => {
    return request(app).get('/api').expect(404)
  })
})
