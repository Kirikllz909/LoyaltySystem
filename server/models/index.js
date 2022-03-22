//Load environment variables
require("dotenv").config();

//Configuration database
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER_DB,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "postgres",
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Loading models to further work with database
db.users = require("./user.model.js")(sequelize, Sequelize);
db.purchases = require("./purchase.model.js")(sequelize, Sequelize);
db.loyalty_systems = require("./loyalty_system.model.js")(sequelize, Sequelize);
db.system_options = require("./system_option.model.js")(sequelize, Sequelize);
db.params_ratio = require("./params_ratio.model.js")(sequelize, Sequelize);

//Configuration relationship between models
//User have many purchases but only one loyalty system and personal information
db.users.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "loyalty_system",
});
db.users.hasMany(db.purchases, { foreignKey: "userId", as: "purchases" });

//Many purchases have one user
db.purchases.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Loyalty system can have many users, one fixed option or many cumulative options or many accumulative options
db.loyalty_systems.hasMany(db.users, { foreignKey: "systemId" });

db.loyalty_systems.hasMany(db.system_options, {
    foreignKey: "systemId",
    as: "system_options",
});
db.loyalty_systems.hasOne(db.params_ratio, {
    foreignKey: "systemId",
    as: "params_ratio",
});

//params_ratio
db.params_ratio.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "system",
});

//system_options
db.system_options.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "system",
});
//Export configured database variable
module.exports = db;
