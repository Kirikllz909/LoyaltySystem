module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("purchase", {
        purchase_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        purchase_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        discount_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        total_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        purchase_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Purchase;
};
