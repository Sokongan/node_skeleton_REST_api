import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envConfig =  dotenv.config();

if(envConfig.error){
    throw new Error('no .env file found')
}

export default {
    port: parseInt(process.env.PORT,10),
    logs:{
        morgan:process.env.MORGAN
    },
}