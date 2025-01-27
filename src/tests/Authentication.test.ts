/*  eslint-disable  */
import 'reflect-metadata';
import request from 'supertest';
import { Server } from 'http';
import { DataSource } from 'typeorm';
import { dataBaseConfig } from '../database/databaseSource';
import app, { startServer } from '../index';

describe('Authentication Tests', () => {
    let server: Server;
    let dataSource: DataSource;
  //  should change these params cuz once its posted it will crash cuz of exising record with same info
    const testUser = {
        name: "umar",
        email: 'testuseraaa@example.com',
        password: 'securePassword123!',
        userType: "corporate",
    };

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

    describe('POST /signup', () => {
        it('should successfully sign up a new user', async () => {
            const response = await request(app)
                .post('/api/v1/signup')
                .send(testUser);

            expect(response.status).toBe(201);
        });

        it('should not allow duplicate email registration', async () => {
            await request(app)
                .post('/api/v1/signup')
                .send(testUser);

            const response = await request(app)
                .post('/api/v1/signup')
                .send(testUser);

            expect(response.status).toBe(400);
        });

        it('should validate user type', async () => {
            const invalidUser = {
                ...testUser,
                userType: 'invalid',
            };

            const response = await request(app)
                .post('/api/v1/signup')
                .send(invalidUser);

            expect(response.status).toBe(400);
        });
    });

    describe('POST /login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/v1/signup')
                .send(testUser);
        });

        it('should successfully log in an existing user', async () => {
            const loginCredentials = {
                email: testUser.email,
                password: testUser.password,
            };

            const response = await request(app)
                .post('/api/v1/login')
                .send(loginCredentials);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(typeof response.body.token).toBe('object');
            expect(response.body.token).not.toBe('');
        });

        it('should not log in with an incorrect password', async () => {
            const wrongPassword = {
                email: testUser.email,
                password: 'wrongPassword123!',
            };

            const response = await request(app)
                .post('/api/v1/login')
                .send(wrongPassword);

            expect(response.status).toBe(400);
        });

        it('should not log in a non-existent user', async () => {
            const nonExistentUser = {
                email: 'nonexistent@example.com',
                password: 'password123!',
            };

            const response = await request(app)
                .post('/api/v1/login')
                .send(nonExistentUser);
            expect(response.status).toBe(400);
        });
    });
});
