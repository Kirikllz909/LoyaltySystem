module.exports = (sequelize, DataTypes) => {
    const FixedSystemOption = sequelize.define("fixed_system_option", {
        option_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        discount_value: { type: DataTypes.INTEGER, allowNull: false },
    });
    return FixedSystemOption;
};
