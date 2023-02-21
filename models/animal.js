const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Animal = sequelize.define('Animal', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Adopted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Animal.associate = (models) => {
    Animal.belongsTo(models.Temperament);
    Animal.belongsTo(models.Size);
    Animal.belongsTo(models.Species);
    Animal.hasOne(models.Adoption);
  };

  return Animal;
};