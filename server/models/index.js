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
db.personal_datas = require("./personal_data.model.js")(sequelize, Sequelize);
db.loyalty_systems = require("./loyalty_system.model.js")(sequelize, Sequelize);
db.fixed_system_options = require("./fixed_system_option.model.js")(
    sequelize,
    Sequelize
);
db.cumulative_system_options = require("./cumulative_system_option.model.js")(
    sequelize,
    Sequelize
);
db.accamulative_system_options =
    require("./accamulative_system_option.model.js")(sequelize, Sequelize);

//Configuration relationship between models
//User have many purchases but only one loyalty system and personal information
db.users.hasOne(db.personal_datas, {
    foreignKey: "userId",
    as: "personal_data",
});
db.users.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "loyalty_system",
});
db.users.hasMany(db.purchases, { foreignKey: "userId", as: "purchases" });

//Many purchases have one user
db.purchases.belongsTo(db.users, { foreignKey: "userId", as: "user" });

//Only one personal information have one user
db.personal_datas.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Loyalty system can have many users, one fixed option or many cumulative options or many accumulative options
db.loyalty_systems.hasMany(db.users, { foreignKey: "systemId" });
db.loyalty_systems.hasOne(db.fixed_system_options, {
    foreignKey: "systemId",
    as: "fixed_option",
});
db.loyalty_systems.hasMany(db.cumulative_system_options, {
    foreignKey: "systemId",
    as: "cumulative_options",
});
db.loyalty_systems.hasMany(db.accamulative_system_options, {
    foreignKey: "systemId",
    as: "accamulative_options",
});

//Only one loyalty system can have one fixed system option
db.fixed_system_options.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "system",
});

//Many cumulative system option can have one loyalty system
db.cumulative_system_options.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "system",
});

//Many accumulative system option can have one loyalty system
db.accamulative_system_options.belongsTo(db.loyalty_systems, {
    foreignKey: "systemId",
    as: "system",
});

//Export configured database variable
module.exports = db;
