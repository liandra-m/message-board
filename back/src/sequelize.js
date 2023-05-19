const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

const startDatabase = async () => {    
    authenticate();
    sync();
}

const authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Sucessfully established connection to database ${process.env.DB}`);
    } catch (error) {
        console.error(`Unable to connect to the database: ${error}`);
    }
}

const sync = async () => {
    try {
        const response = await sequelize.sync({alter: true});
        console.log('Sucessfully synced database models');
    } catch (error) {
        console.error(`An error occurred while trying to sync database ${error}`);
    }
}

module.exports = {
    startDatabase,
    sequelize
}