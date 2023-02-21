const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    FullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Adoption);
  };

  return User;
};