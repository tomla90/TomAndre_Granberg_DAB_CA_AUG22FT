const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Species = sequelize.define('Species', {
    Species: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Species.associate = (models) => {
    Species.hasMany(models.Animal);
  };

  return Species;
};