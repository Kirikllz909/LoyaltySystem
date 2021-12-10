module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("purchase", {
        purchase_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        purchase_amount: {
            type: dataTypes.INTEGER,
        },
        purchase_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Purchase;
};
