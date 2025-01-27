import express from 'express';
import dotenv from 'dotenv'
import { dataBaseConfig } from './database/databaseSource';
import { errorHandler } from './middlewares/errorHandler.middleware';
import ParkingLotRoutes from './routes/parkingLot.routes';
import authenticationRoutes from './routes/authentication.routes';
import usersRoutes from './routes/users.routes';
import { Server } from 'http';
dotenv.config()
const app = express()


app.use(express.json())
let server:Server


const PORT = process.env.PORT || 3000;

  const handleInitDatabase = async ()=>{
    try{
        const startDb = await dataBaseConfig.initialize()
        if(startDb){
            return "Database initialized successfully"
        }
    }catch(err){
        console.error(err,"err at initialize")
    }
} 
handleInitDatabase()  

app.use('/api/v1', authenticationRoutes.getRouter())
app.use('/api/v1', ParkingLotRoutes.getRouter())
app.use('/api/v1', usersRoutes.getRouter())

export function startServer() {
    server = app.listen(process.env.PORT || 3000);
    return server;
}

export function getServer() {
    return server;
}
app.use(errorHandler)
export default app;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})