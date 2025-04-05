module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categorias', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Categorias'),
};