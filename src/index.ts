import express from 'express';
import dotenv from 'dotenv'
import { dataBaseConfig } from './database/databaseSource';
import { errorHandler } from './middlewares/errorHandler.middleware';
import ParkingLotRoutes from './routes/parkingLot.routes';
import authenticationRoutes from './routes/authentication.routes';
import usersRoutes from './routes/users.routes';
dotenv.config()
const app = express()


//console.log(process.env.DB_HOST,"here")

app.use(express.json())


const PORT = process.env.PORT || 3000;
console.log(PORT,'port here')
console.log(process.env.DB_PASSWORD, 'password index')

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


app.use(errorHandler)
export default app;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})