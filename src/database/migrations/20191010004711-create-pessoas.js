module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true,
      },
      uf_origem: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      template1: {
        type: Sequelize.STRING(4000),
        allowNull: false,
        unique: true,
      },
      pendencia: {
        type: Sequelize.STRING,
        defaultValue: 'false',
        allowNull: false,
      },
      uf_pendencia: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('pessoas');
  },
};
