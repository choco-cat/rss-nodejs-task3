const Sequelize = require("sequelize");
// database username password
const sequelize = new Sequelize("gamedb", "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
    port: 5433
});

sequelize.sync();
sequelize.authenticate().then(
    () => {
        console.log("Connected to DB");
    },

    (err) => {
        console.log(`Error: ${err}`);
    }
);

module.exports = sequelize;
