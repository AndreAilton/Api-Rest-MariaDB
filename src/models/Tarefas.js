import Sequelize, { Model } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export default class Tarefas extends Model {
  static init(sequelize) {
    super.init({
        tittle: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Título não pode ficar vazio.',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        done: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        category: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
        tableName: 'Tarefas',
      }
    );
    return this;
  }

  static associate(models) {
    // Associa a tarefa com o usuário
    this.belongsTo(models.Usuarios, { foreignKey: 'user_id' });
  }
}
