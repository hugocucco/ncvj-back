module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('pessoas', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('pessoas', 'avatar_id');
  },
};
