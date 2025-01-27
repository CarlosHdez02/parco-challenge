/* import request from 'supertest';
import { DataSource } from 'typeorm';
import server from '../index';
import User from '../entities/users/users.entity';
//let connection: DataSource;
describe('Authentication Tests', () => {
    

    const testUser = {
        name: "islam",
        email: 'testuser@example.com',
        password: 'securePassword123!',
        userType: "coporate" // Correct spelling as per error message
    };

    describe('POST signup', () => {
        it('should successfully sign up a new user', async () => {
            const response = await request(server)
                .post('/api/v1/signup')
                .send(testUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
        }); // Increased timeout

        it('should not allow duplicate email registration', async () => {
            // First signup
            await request(server)
                .post('/api/v1/signup')
                .send(testUser);

            // Attempt duplicate signup
            const response = await request(server)
                .post('/api/v1/signup')
                .send(testUser);

            expect(response.status).toBe(400);
           
        });

        it('should validate user type', async () => {
            const invalidUser = {
                ...testUser,
                userType: 'invalid'
            };

            const response = await request(server)
                .post('/api/v1/signup')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toMatch(/user type must be coporate, visitor or provider/i);
        });
    });

    describe('POST login', () => {
        beforeEach(async () => {
            
            await request(server)
                .post('/api/v1/signup')
                .send(testUser);
        });

        it('should successfully log in existing user', async () => {
            const loginCredentials = {
                email: testUser.email,
                password: testUser.password
            };

            const response = await request(server)
                .post('/api/v1/login')
                .send(loginCredentials);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(typeof response.body.token).toBe('string');
            expect(response.body.token).not.toBe('');
        }, 30000); // Increased timeout for login

        it('should not log in with incorrect password', async () => {
            const wrongPassword = {
                email: testUser.email,
                password: 'wrongPassword123!'
            };

            const response = await request(server)
                .post('/api/v1/login')
                .send(wrongPassword);

            expect(response.status).toBe(400);
        });

        it('should not log in non-existent user', async () => {
            const nonExistentUser = {
                email: 'nonexistent@example.com',
                password: 'password123!'
            };

            const response = await request(server)
                .post('/api/v1/login')
                .send(nonExistentUser);

            expect(response.status).toBe(400);
        });
    });
});
*/