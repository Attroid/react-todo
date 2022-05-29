const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('projects', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_task_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('projects');
  },
};
