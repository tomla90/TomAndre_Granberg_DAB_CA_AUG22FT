const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Size = sequelize.define('Size', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Size.associate = (models) => {
    Size.hasMany(models.Animal);
  };

  return Size;
};