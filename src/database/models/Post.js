const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      u_id: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      conteudo: DataTypes.TEXT,
      publicado: DataTypes.BOOLEAN,
      banner_img: DataTypes.STRING,
      banner_id: DataTypes.STRING,
      shared_img: DataTypes.STRING,
      shared_id: DataTypes.STRING,
      editado: DataTypes.BOOLEAN,
    }, {
      sequelize,
      initialAutoIncrement: 1000
    })
  }
  
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Textlist, { foreignKey: 'textlist_post_owner', as: 'textlist' });
  }
}
module.exports = Post;