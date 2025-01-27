import 'reflect-metadata'
import {DataSource} from 'typeorm'
import dotenv from 'dotenv';


dotenv.config() //  to fix later

export const dataBaseConfig = new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USER,
    password: process.env.DB_PASSWORD?.toString(),
    database:process.env.DB_NAME,
    synchronize:process.env.NODE_ENV === 'development',
    logging:true,
    entities:['src/entities/**/*.ts'],
    migrations:['src/migrations/**/*.ts'],
    subscribers:['src/subscribers/**/*/.ts']
}) 