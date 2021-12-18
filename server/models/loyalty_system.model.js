module.exports = (sequelize, DataTypes) => {
    const LoyaltySystem = sequelize.define("loyalty_system", {
        system_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        is_default: { type: DataTypes.BOOLEAN, allowNull: false },
    });
    return LoyaltySystem;
};
