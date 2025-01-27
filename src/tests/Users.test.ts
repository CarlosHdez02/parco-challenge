/* import server from '../index';
import request from 'supertest';

describe('User API Integration Tests', () => {
    //  token expires
    const currentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2MTczNTMyLTkyMTEtNGZmOC1iOGM5LTBiYjBjYzA4YTNmMiIsInVzZXJUeXBlIjoidmlzaXRvciIsImlhdCI6MTczNzkzMjEyNywiZXhwIjoxNzM3OTM1NzI3fQ.Wo5cXyJCHwF-QEIlEWKJYE_tXP7FSQYL8XCP0-Mivl0`;

    it('should retrieve users', async () => {
        const response = await request(server)
            .get(`/api/v1/users`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should retrieve users with limit', async () => {
        const limit = 2;
        const response = await request(server)
            .get(`/api/v1/users?limit=${limit}`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should skip users', async () => {
        const skip = 2;
        const response = await request(server)
            .get(`/api/v1/users?skip=${skip}`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should order users by name', async () => {
        const response = await request(server)
            .get('/api/v1/users?order=ASC')
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should get user by ID', async () => {
        const userId = 'cb114d4b-0e1a-47c9-9d1c-87e6b254e0b0';
        const response = await request(server)
            .get(`/api/v1/users/${userId}`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });
});

*/