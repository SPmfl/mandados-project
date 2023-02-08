import { DataTypes } from "sequelize";
import sequelize from '../db-connection/db-postgresql.js';

const User = sequelize.define('User', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "operator"
        },
        rol: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue: "operator"
        }
    },{
        // sequelize,
        tableName: 'users',
        timestamps: false
    }
);

//User.sync({ alter:true })
User.sync()
    .then(()=> console.log("table Users created"))
    .catch(error => console.error("table not created", error));



export default User;

