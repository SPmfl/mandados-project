import express from 'express';
import morgan from 'morgan';

import './db/db-connection/db-postgresql.mjs';
import './db/db-connection/db-mongo.js';

import authUser from './routes/auth/authRoute.js';
import operatorRoutes  from './routes/roles/operatorRoutes.js';
import adminRoutes from './routes/roles/adminRoutes.js';


import cors from 'cors';


const app = express();
import './auth/auth.js';

app.options('*', cors());
// app.use(cors({origin: '*'}));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.status(200).redirect('/api');
});
app.get('/api', (req, res)=>{
    res.status(200).json({msg:"Welcome to Mandados API"});
});
app.use('/api/auth', authUser);
app.use('/api/operator', operatorRoutes);
app.use('/api/admin', adminRoutes);

app.get('*',(req,res)=>{
    res.status(404).end("404 - page not found ");
});

export default app;

