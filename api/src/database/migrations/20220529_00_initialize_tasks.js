const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'projects', key: 'id' },
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tag_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('tasks');
  },
};
