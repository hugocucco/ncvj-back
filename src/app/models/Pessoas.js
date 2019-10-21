import Sequelize, { Model } from 'sequelize';

class Pessoas extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        uf_origem: Sequelize.STRING,
        template1: Sequelize.STRING,
        pendencia: Sequelize.STRING,
        uf_pendencia: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Pessoas;
