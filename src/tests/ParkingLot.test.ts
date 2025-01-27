/*  eslint-disable  */
import 'reflect-metadata';
import request from 'supertest';
import { Server } from 'http';
import { DataSource } from 'typeorm';
import { dataBaseConfig } from '../database/databaseSource';
import app, { getServer, startServer } from '../index';

describe('Parking Lot Tests', () => {
    let server: Server;
    let createdParkingLotId: string;
    let dataSource: DataSource;
    //  token expires
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2MTczNTMyLTkyMTEtNGZmOC1iOGM5LTBiYjBjYzA4YTNmMiIsInVzZXJUeXBlIjoidmlzaXRvciIsImlhdCI6MTczNzk1MDAyMywiZXhwIjoxNzM3OTUzNjIzfQ.vv7V3TYVIxIZ-JSyRsm7AqJX8Qy2Pojj9OTkkpz3apU';
    //  should change these params cuz once its posted it will crash cuz of exising record with same info
    const testParkingLot = {
        name: "second parking lot test waaahhh",
        contact: '+52123445678',
        parkingType: "public",
        spots: 50,
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

    describe('POST /parkingLots', () => {
        it('should create a new parking lot', async () => {
            const response = await request(app)
                .post('/api/v1/parkingLots')
                .set('Authorization', `Bearer ${token}`)
                .send(testParkingLot);

            expect(response.status).toBe(201);
            createdParkingLotId = response.body.id;
        });
    });

    describe('GET /parkingLots', () => {
        it('should return all parking lots', async () => {
            const response = await request(app)
                .get('/api/v1/parkingLots')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
           
        });
    });

    describe('POST /parkingLot/checkin', () => {
        beforeEach(async () => {
            // Only create a new parking lot if we don't have one
            if (!createdParkingLotId) {
                const response = await request(app)
                    .post('/api/v1/parkingLots')
                    .set('Authorization', `Bearer ${token}`)
                    .send(testParkingLot);
                createdParkingLotId = response.body.id;
            }
        });

        it('should check in successfully', async () => {
            const response = await request(app)
                .post('/api/v1/parkingLot/checkin')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    parkingId: createdParkingLotId,
                    userType: "corporate"
                });

            expect(response.status).toBe(200);
        });

        it('should check in successfully', async () => {
            const response = await request(app)
                .post('/api/v1/parkingLot/checkin')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    parkingId: createdParkingLotId,
                    userType: "corporate"
                });

            expect(response.status).toBe(200);
        });

    });

    describe('PATCH /parkingLots/:id', () => {
        it('should update the contact and spots number', async () => {
            const updatedData = {
                contact: "+5245678906231",
                spots: 200
            };

            const response = await request(app)
                .patch(`/api/v1/parkingLots/${createdParkingLotId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('contact', updatedData.contact);
            expect(response.body).toHaveProperty('spots', updatedData.spots);
        });
    });
});