import { DataTypes } from "sequelize";
import sequelize from '../db-connection/db-postgresql.mjs';
import bcrypt from 'bcrypt';

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
        roluser: {
            type: DataTypes.ENUM('admin','operator'),
            allowNull:false,
            defaultValue: "operator"
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },{
        // sequelize,
        tableName: 'users',
        timestamps: false
        // instanceMethods: {
        //      isValidPassword(password){
        //          return bcrypt.compare(password, this.password);
        //      }
        // }
    }
);

User.sync({ force:true })
//User.sync()
    .then(()=> console.log("table Users created"))
    .catch(error => console.error("table not created", error));

User.isValidPassword = function (password, hashedPassword) {
    // return bcrypt.compare(password, this.password).catch(err=>console.error("error while comparing passwords",err));
    return bcrypt.compare(password, hashedPassword).catch(err=>console.error("error while comparing passwords",err));
}

export default User;

