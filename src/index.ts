import express from 'express';
import dotenv from 'dotenv'
import { dataBaseConfig } from './database/databaseSource';
import { errorHandler } from './middlewares/errorHandler.middleware';
import ParkingLotRoutes from './routes/parkingLot.routes';
import authenticationRoutes from './routes/authentication.routes';
import usersRoutes from './routes/users.routes';
import { Server } from 'http';

console.log('Starting application...');

dotenv.config()
console.log('Environment variables loaded');

const app = express()
app.use(express.json())

let server: Server

const PORT = process.env.PORT || 3000;

const handleInitDatabase = async () => {
    console.log('Attempting database connection...');
    try {
        const startDb = await dataBaseConfig.initialize()
        if (startDb) {
            console.log("Database initialized successfully");
            return "Database initialized successfully"
        }
    } catch (err) {
        console.error("Database initialization failed:", err);
        // Don't exit the process, but log the error
        return null;
    }
}

console.log('Setting up routes...');
app.use('/api/v1', authenticationRoutes.getRouter())
app.use('/api/v1', ParkingLotRoutes.getRouter())
app.use('/api/v1', usersRoutes.getRouter())
console.log('Routes configured');

export function startServer() {
    console.log('Starting server...');
    server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is now running on port ${process.env.PORT || 3000}`);
    });
    return server;
}

export function getServer() {
    return server;
}

app.use(errorHandler)

// Initialize database and start server
console.log('Initializing application...');
handleInitDatabase()
    .then(() => {
        startServer();
    })
    .catch((error) => {
        console.error('Failed to start application:', error);
        process.exit(1);
    });

export default app;