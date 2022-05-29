const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('customizations', {
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
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('customizations');
  },
};
