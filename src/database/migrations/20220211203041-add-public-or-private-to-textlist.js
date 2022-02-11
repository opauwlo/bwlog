module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'textlists',
        'public',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      );

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('textlists', 'public');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};