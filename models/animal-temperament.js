const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AnimalTemperament = sequelize.define('AnimalTemperament', {
    AnimalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TemperamentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  AnimalTemperament.associate = (models) => {
    AnimalTemperament.belongsTo(models.Animal);
    AnimalTemperament.belongsTo(models.Temperament);
  };

  return AnimalTemperament;
};