const Textlist = require('../../database/models/Textlist');

const slugify = require('slugify');
const cache = require('../utils/cache');

const { Op } = require('sequelize');

module.exports = {
  Textlists: {
    createTextlist: async (textlistName, ownerId) => {
      let success = null;
      await Textlist.create({
        titulo: textlistName,
        slug: slugify(textlistName, { lower: true }),
        owner: ownerId
      }).then(() => {
        success = true;
      }).catch(() => {
        success = false;
      });
      return success
    },
    getTextlist: async (ownerId) => {

      const cachedTextlist = await cache.get(`textlist_${ownerId}`);
      if (cachedTextlist) {
        return cachedTextlist;
      }
      try {
        const textlist = await Textlist.findAll({
          order: [['createdAt', 'DESC']],
          where: {
            owner: ownerId
          }
        });
        await cache.set(`textlist_${ownerId}`, textlist, 5);
        return JSON.parse(JSON.stringify(textlist));

      } catch (e) { }
    },
    getOneTextlist: async (textlistId) => {

      const cachedTextlist = await cache.get(`textlist_${textlistId}`);

      if (cachedTextlist) {
        return cachedTextlist;
      }

      try {
        const textlist = await Textlist.findOne({
          where: {
            id: textlistId
          }
        });

        await cache.set(`textlist_${textlistId}`, textlist, 25);
        return JSON.parse(JSON.stringify(textlist));

      } catch (e) {}
    },
    getTextlistFromEditPage: async (selected) => {
      
      const textlist = await Textlist.findAll({
        attributes: ['id', 'titulo'],
        order: [['createdAt', 'DESC']],
        where: {
          id: {
            [Op.not]: selected
          }
        }
      });
      return JSON.parse(JSON.stringify(textlist));
      return textlist;
    },
    updateTextlist: async (textlistId, textlistName) => {
      let success = null;
      await Textlist.update({
        titulo: textlistName,
        slug: slugify(textlistName , { lower: true })
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