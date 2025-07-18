const request = require('supertest');
const app = require('../src/app');

describe('Users API', () => {
  it('should create a user', async () => {
    const res = await request(app).post('/users').send({ name: 'Arley' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Arley');
  });

  it('should return list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
