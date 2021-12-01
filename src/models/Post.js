const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      slug: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      conteudo: DataTypes.TEXT,
      publicado: DataTypes.BOOLEAN,
      editado: DataTypes.BOOLEAN,

      id_user: DataTypes.STRING
    }, {
      sequelize
    })
  }
  
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
module.exports = Post;