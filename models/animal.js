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
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  Animal.associate = (models) => {
    Animal.belongsTo(models.Species);
    Animal.belongsTo(models.Size);
    Animal.belongsToMany(models.Temperament, { through: 'AnimalTemperament' });
    Animal.hasOne(models.Adoption);
    Animal.belongsTo(models.Species);
  };

  return Animal;
};