import Sequelize, { Model } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export default class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        category: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'A categoria não pode ficar vazia.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'Categorias',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'user_id' });
  }
}