import request from 'supertest';
import { app, server } from '../src/app';

describe('Express App', () => {
  afterAll(() => {
    if (server) {
      server.close(); // Properly close the server after all tests
    }
  });
  // Test health check route
  it('should return 200 for the /health route', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is healthy');
  });

  // Test 404 handler
  it('should return 404 for unmatched routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'Not Found',
      message: 'The requested resource was not found',
    });
  });

  // Test CORS headers
  it('should set CORS headers correctly', async () => {
    const response = await request(app).options('/health'); // Preflight request
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toContain('GET');
  });
});
