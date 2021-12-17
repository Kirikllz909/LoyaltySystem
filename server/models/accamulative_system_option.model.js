module.exports = (sequelize, DataTypes) => {
    const AccamulativeSystemOption = sequelize.define(
        "accamulative_system_option",
        {
            option_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            step_value: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            purchase_exchange: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            score_rate_exchange: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            points_payment_limit_min: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            points_payment_limit_max: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            points_time_limit: { type: DataTypes.STRING, allowNull: false },
        }
    );
    return AccamulativeSystemOption;
};
