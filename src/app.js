import express from 'express';
import morgan from 'morgan';

import './db/db-connection/db-postgresql.js';
import './db/db-connection/db-mongo.js';

import loginUser from './routes/auth/loginRoute.js';
//import singUpUser from './routes/auth/singUpRoute.js';
import operatorRoutes  from './routes/roles/operatorRoutes.js';
import adminRoutes from './routes/roles/adminRoutes.js';


const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.status(200).send("Welcome to Mandado API");
});


app.use('/api', loginUser);
//app.use('/api/singup', singUpUser);
app.use('/api/operator', operatorRoutes);
app.use('/api/admin', adminRoutes);


export default app;