const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Temperament = sequelize.define('Temperament', {
    Temperament: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Temperament.associate = (models) => {
    Temperament.hasMany(models.Animal);
  };

  return Temperament;
};