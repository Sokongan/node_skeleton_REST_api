import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config';
import type { Express } from 'express';
import bodyParser from 'body-parser';

export default async({ app }: { app:Express }) => {
   
    app.get('/status',(req,res) => res.sendStatus(200).end());
    app.head('/status',(req,res) => res.sendStatus(200).end());

    app.enable('trust proxy');
    
    app.use(helmet({
        contentSecurityPolicy:false
        })
    );

    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended:false }));
    app.use(morgan(config.logs.morgan));
    app.use('/v1/api', (await import('../router/index')).default);

}