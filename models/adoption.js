const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Adoption = sequelize.define('Adoption', {
    Adopted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Adoption.associate = (models) => {
    Adoption.belongsTo(models.Animal);
  };

  return Adoption;
};