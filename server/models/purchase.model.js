module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("purchase", {
        purchase_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        purchase_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        purchase_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Purchase;
};
