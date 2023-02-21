const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Species = sequelize.define('Species', {
    Name: {
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