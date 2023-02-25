const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Adoption = sequelize.define('Adoption', {
    AnimalId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Animals',
        key: 'id'
      },
      allowNull: false
    },
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