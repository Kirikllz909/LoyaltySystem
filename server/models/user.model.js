module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        balance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
        },
    });
    return User;
};
