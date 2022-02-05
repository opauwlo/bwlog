module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'posts',
        'textlist_post_owner',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {model: 'textlists', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
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
      await queryInterface.removeColumn('posts', 'textlist_post_owner');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};