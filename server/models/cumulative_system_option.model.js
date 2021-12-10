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
            },
            discount_value: { type: DataTypes.INTEGER },
            counting_period: { type: DataTypes.STRING },
        }
    );
    return CumulativeSystemOption;
};
