module.exports = (sequelize, DataTypes) => {
    const SystemOption = sequelize.define("system_option", {
        option_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        min_purchase_value: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        max_purchase_value: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        discount_value: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        purchase_exchange: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        score_rate_exchange: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        points_payment_limit_min: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        points_payment_limit_max: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        min_discount_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        max_discount_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        points_time_limit: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    });
    return SystemOption;
};
