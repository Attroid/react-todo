const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('database');

class Customization extends Model {}

Customization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'customization',
  }
);

Customization.prototype.toJSON = function () {
  const { id, userId, ...rest } = this.get();

  return { ...rest };
};

module.exports = Customization;
