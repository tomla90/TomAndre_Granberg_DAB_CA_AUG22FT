const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Temperament = sequelize.define('Temperament', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Temperament.associate = (models) => {
    Temperament.belongsToMany(models.Animal, { through: 'AnimalTemperament' });
  };

  return Temperament;
};