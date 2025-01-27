import 'reflect-metadata';
import request from 'supertest';
import { Server } from 'http';
import { DataSource } from 'typeorm';
import { dataBaseConfig } from '../database/databaseSource';
import app, { startServer } from '../index';


describe('User API Integration Tests', () => {
    let server: Server;
    let dataSource: DataSource;
    //  token expires
    const currentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2MTczNTMyLTkyMTEtNGZmOC1iOGM5LTBiYjBjYzA4YTNmMiIsInVzZXJUeXBlIjoidmlzaXRvciIsImlhdCI6MTczNzk1MDAyMywiZXhwIjoxNzM3OTUzNjIzfQ.vv7V3TYVIxIZ-JSyRsm7AqJX8Qy2Pojj9OTkkpz3apU';
    

    beforeAll(async () => {
        try {
            // Initialize database connection
            dataSource = dataBaseConfig;
            await dataSource.initialize();
            console.log('Database connected');

            // Start the server
            server = await startServer();
            console.log('Test server started');
        } catch (error) {
            console.error('Setup error:', error);
            throw error;
        }
    });

    afterAll(async () => {
        try {
            // Close database connection
            if (dataSource && dataSource.isInitialized) {
                await dataSource.destroy();
                console.log('Database connection closed');
            }
            
            // Close server
            if (server && server.listening) {
                await new Promise<void>((resolve) => {
                    server.close(() => resolve());
                });
                console.log('Server closed');
            }
        } catch (error) {
            console.error('Cleanup error:', error);
            throw error;
        }
    });

    it('should retrieve users', async () => {
        const response = await request(app)
            .get(`/api/v1/users`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should retrieve users with limit', async () => {
        const limit = 2;
        const response = await request(app)
            .get(`/api/v1/users?limit=${limit}`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should skip users', async () => {
        const skip = 2;
        const response = await request(app)
            .get(`/api/v1/users?skip=${skip}`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should order users by name', async () => {
        const response = await request(app)
            .get('/api/v1/users?order=ASC')
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });

    it('should get user by ID', async () => {
        const userId = 'cb114d4b-0e1a-47c9-9d1c-87e6b254e0b0';
        const response = await request(app)
            .get(`/api/v1/users/${userId}`)
            .set('Authorization', `Bearer ${currentToken}`);
        expect(response.status).toBe(200);
    });
});
