module.exports = (sequelize, DataTypes) => {
    const PersonalData = sequelize.define("personal_data", {
        name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        phone_number: { type: DataTypes.INTEGER },
    });
    return PersonalData;
};
