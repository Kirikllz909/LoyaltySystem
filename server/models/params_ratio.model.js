module.exports = (sequelize, DataTypes) => {
    const ParamsRatio = sequelize.define("params_ratio", {
        params_ratio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_discount_ratio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 1,
        },
        total_points_ratio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 1,
        },
    });
    return ParamsRatio;
};
