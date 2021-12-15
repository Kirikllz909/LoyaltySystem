module.exports = (sequelize, DataTypes) => {
    const PersonalData = sequelize.define("personal_data", {
        name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        phone_number: { type: DataTypes.INTEGER, allowNull: false },
    });
    return PersonalData;
};
