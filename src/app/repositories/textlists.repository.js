const Textlist = require('../../database/models/Textlist');

const slugify = require('slugify');

const { Op } = require('sequelize');

module.exports = {
  Textlists: {
    createTextlist: async (textlistName, ownerId) => {
      let success = null;
      await Textlist.create({
        titulo: textlistName,
        slug: slugify(textlistName),
        owner: ownerId
      }).then(() => {
        success = true;
      }).catch(() => {
        success = false;
      });
      return success
    },
    getTextlist: async (ownerId) => {
      const textlist = await Textlist.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          owner: ownerId
        }
      });
      return textlist;
    },
    getOneTextlist: async (textlistId) => {
      const textlist = await Textlist.findOne({
        where: {
          id: textlistId
        }
      });
      return textlist;
    },
    getTextlistFromEditPage: async (selected) => {
      const textlist = await Textlist.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          id: {
            [Op.not]: selected
          }
        }
      });
      return textlist;
    },
    updateTextlist: async (textlistId, textlistName) => {
      let success = null;
      await Textlist.update({
        titulo: textlistName,
        slug: slugify(textlistName)
      }, {
        where: {
          id: textlistId
        }
      }).then(() => {
        success = true; 
      }).catch(() => {
        success = false;
      });
      return success;
    },
    deleteTextlist: async (textlistId) => {
      let success = null;
      await Textlist.destroy({
        where: {
          id: textlistId
        }
      }).then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });
      return success;
    }
  }
}