import  dotenv  from 'dotenv';
import  Sequelize  from 'sequelize';

dotenv.config();

const sequelize = new Sequelize('mandados','postgres','postgres',{
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;



