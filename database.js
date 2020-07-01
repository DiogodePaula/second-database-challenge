const sequelizeImport = require("sequelize");
require("dotenv").config();

//essa parte deve ser exportada
const sequelize = new sequelizeImport(proces.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
});

module.exports = sequelize;