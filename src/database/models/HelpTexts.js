const { Model, DataTypes } = require("sequelize");

class HelpTexts extends Model {
  static init(sequelize) {
    super.init( 
      {
        titulo: DataTypes.STRING,
        slug: DataTypes.STRING,
        descricao: DataTypes.STRING,
        conteudo: DataTypes.TEXT,
        banner_img: DataTypes.STRING,
        banner_id: DataTypes.STRING,
        publicado: DataTypes.BOOLEAN,
        tag: DataTypes.STRING,
        sponsor: DataTypes.STRING,
        sponsor_link: DataTypes.STRING,
      }, {
        sequelize,
        initialAutoIncrement: 1000
      })
    }
}

module.exports = HelpTexts;
