const Sequelize = require("sequelize");
require("dotenv").config();

//essa parte deve ser exportada
const sequelize = new Sequelize(proces.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
});

module.exports = sequelize;