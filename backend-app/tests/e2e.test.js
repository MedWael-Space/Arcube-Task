import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js'; 

describe('End-to-End Tests for URL Shortener API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should complete the full cycle of shortening and redirecting', async () => {
    const longUrl = 'https://www.google.com';

    const shortenResponse = await request(app).post('/shorten').send({ longUrl });
    expect(shortenResponse.status).toBe(200);
    expect(shortenResponse.body).toHaveProperty('shortUrl');

    const shortUrl = shortenResponse.body.shortUrl;
    const shortId = shortUrl.split('/').pop();

    console.log("Shortened URL:", shortUrl);
    console.log("Shortened ID:", shortId);
    const redirectResponse = await request(app)
      .get(`/${shortId}`)
      .redirects(1);

    console.log("Redirect Response Status:", redirectResponse.status);
    console.log("Redirect Response Text:", redirectResponse.text);

    expect(redirectResponse.status).toBe(200);
    expect(redirectResponse.text).toContain(longUrl);
  }, 15000);
});
