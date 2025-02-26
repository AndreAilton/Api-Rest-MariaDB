module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Files', 'status', {
      type: Sequelize.BOOLEAN, // CORREÇÃO AQUI
      allowNull: false,
      defaultValue: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Files', 'status');
  },
};
