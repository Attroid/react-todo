const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('database');

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdTaskCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'project',
  }
);

Project.prototype.toJSON = function () {
  const { userId, createdTaskCount, ...rest } = this.get();

  return { ...rest };
};

module.exports = Project;
