const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Adoption = sequelize.define('Adoption', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Adoption.associate = (models) => {
    Adoption.belongsTo(models.Animal);
    Adoption.belongsTo(models.User);
  };

  return Adoption;
};