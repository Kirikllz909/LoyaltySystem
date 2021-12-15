module.exports = (sequelize, DataTypes) => {
    const CumulativeSystemOption = sequelize.define(
        "cumulative_system_option",
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
            discount_value: { type: DataTypes.INTEGER, allowNull: false },
            counting_period: { type: DataTypes.STRING, allowNull: false },
        }
    );
    return CumulativeSystemOption;
};
