import request from 'supertest';
import app from '../src/app.js';
import UrlModel from '../src/models/urlModel.js';
import { jest } from '@jest/globals';

jest.mock('../src/models/urlModel.js', () => ({
  save: jest.fn().mockResolvedValue({
    longUrl: 'https://www.example.com/test',
    shortId: 'abc123',
  }),
  findOne: jest.fn(),
}));

describe('URL Shortener API', () => {
  let testShortId;

  it('should shorten a valid URL', async () => {
    const response = await request(app).post('/shorten').send({
      longUrl: 'https://www.example.com/test',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('shortUrl');
    testShortId = response.body.shortUrl.split('/').pop();
  });

  it('should return an error for invalid URLs', async () => {
    const response = await request(app).post('/shorten').send({
      longUrl: 'invalid-url',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid URL');
  });

  it('should redirect to the original URL', async () => {
    jest.spyOn(UrlModel, 'findOne').mockResolvedValue({
      longUrl: 'https://www.example.com/test',
      shortId: testShortId,
    });

    const response = await request(app).get(`/${testShortId}`);
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('https://www.example.com/test');
  });

  it('should return 404 for a non-existent short URL', async () => {
    jest.spyOn(UrlModel, 'findOne').mockResolvedValue(null);
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'URL not found');
  });
});
