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
            },
            purchase_exchange: {
                type: DataTypes.INTEGER,
            },
        }
    );
    return AccamulativeSystemOption;
};
