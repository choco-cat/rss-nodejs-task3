const Sequelize = require('sequelize');
//database username password
const sequelize = new Sequelize('gamedb', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433
});

sequelize.sync();
sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)
