module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Usuarios', 'status', {
      type: Sequelize.BOOLEAN, // CORREÇÃO AQUI
      allowNull: false,
      defaultValue: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Usuarios', 'status');
  },
};
