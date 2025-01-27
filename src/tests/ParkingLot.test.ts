import request from 'supertest';
import server from '../index';

describe('Parking Lot Tests', () => {
    let createdParkingLotId: string;
    
    // Test data
    const testParkingLot = {
        name: "First parking lot test",
        contact: '+52123445678',
        parkingType: "public",
        spots: 50,
    };

    describe('POST /parkingLots', () => {
        it('should create a new parking lot', async () => {
            const response = await request(server)
                .post('/api/v1/parkingLots')
                .send(testParkingLot);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('name', testParkingLot.name);
            expect(response.body).toHaveProperty('id');
            
            // Save the ID for later tests
            createdParkingLotId = response.body.id;
        });

        it('should validate required fields when creating parking lot', async () => {
            const invalidParkingLot = {
                name: "Invalid parking lot"
                // Missing required fields
            };

            const response = await request(server)
                .post('/api/v1/parkingLots')
                .send(invalidParkingLot);

            expect(response.status).toBe(400);
        });
    });

    describe('GET /parkingLots', () => {
        beforeEach(async () => {
            // Create a test parking lot before getting the list
            await request(server)
                .post('/api/v1/parkingLots')
                .send(testParkingLot);
        });

        it('should return all parking lots', async () => {
            const response = await request(server)
                .get('/api/v1/parkingLots');

            expect(response.status).toBe(200);
        });
    });

    describe('POST /parkingLot/checkin', () => {
        beforeEach(async () => {
            // Create a test parking lot and save its ID
            const response = await request(server)
                .post('/api/v1/parkingLots')
                .send(testParkingLot);
            createdParkingLotId = response.body.id;
        });

        it('should check in successfully', async () => {
            const response = await request(server)
                .post('/api/v1/parkingLot/checkin')
                .send({
                    parkingId: createdParkingLotId,
                    userType: "corporate"
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'success');
        });

        it('should return an error for invalid user type checkin', async () => {
            const response = await request(server)
                .post('/api/v1/parkingLot/checkin')
                .send({
                    parkingId: createdParkingLotId,
                    userType: "tester"
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errorCode', 'ACCESS_DENIED');
        });

        it('should return an error for non-existent parking lot', async () => {
            const response = await request(server)
                .post('/api/v1/parkingLot/checkin')
                .send({
                    parkingId: 'non-existent-id',
                    userType: "corporate"
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('PATCH /parkingLots/:id', () => {
        beforeEach(async () => {
            // Create a test parking lot and save its ID
            const response = await request(server)
                .post('/api/v1/parkingLots')
                .send(testParkingLot);
            createdParkingLotId = response.body.id;
        });

        it('should update the contact and spots number', async () => {
            const updatedData = {
                contact: "+5245678906231",
                spots: 200
            };

            const response = await request(server)
                .patch(`/api/v1/parkingLots/${createdParkingLotId}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('contact', updatedData.contact);
            expect(response.body).toHaveProperty('spots', updatedData.spots);
        });

        it('should return error for non-existent parking lot', async () => {
            const response = await request(server)
                .patch('/api/v1/parkingLots/non-existent-id')
                .send({
                    contact: "+5245678906231"
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });

        it('should validate update data', async () => {
            const invalidData = {
                spots: -1 // Invalid number of spots
            };

            const response = await request(server)
                .patch(`/api/v1/parkingLots/${createdParkingLotId}`)
                .send(invalidData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });
});