
import  Sequelize  from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// const sequelize = new Sequelize('postgres',process.env.POSTGRES_USER,process.env.POSTGRES_PASSWORD,{
//     host: process.env.POSTGRES_HOST,
//     dialect: 'postgres'
// });

const sequelize = new Sequelize('postgres','postgres','postgres',{
    host: 'db-postgres',
    dialect: 'postgres'
});

export default sequelize;



