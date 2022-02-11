const Textlist = require('../../database/models/Textlist');

const slugify = require('slugify');
const cache = require('../utils/cache');

const { Op } = require('sequelize');

module.exports = {
  Textlists: {
    createTextlist: async (textlistName, ownerId, isPublic) => {
      let success = null;
      await Textlist.create({
        titulo: textlistName,
        slug: slugify(textlistName, { lower: true }),
        owner: ownerId,
        public: isPublic
      }).then(() => {
        success = true;
      }).catch(() => {
        success = false;
      })
      return success
    },
    getTextlist: async (ownerId) => {

      const cachedTextlist = await cache.get(`textlistP_${ownerId}`);
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
        await cache.set(`textlistP_${ownerId}`, textlist, 5);
        return JSON.parse(JSON.stringify(textlist));

      } catch (e) { }
    },
    getTextlistPublic: async (ownerId) => {

      try {
        const textlist = await Textlist.findAll({
          order: [['createdAt', 'DESC']],
          where: {
            owner: ownerId,
            public: true
          }
        });
        return JSON.parse(JSON.stringify(textlist));

      } catch (e) { }
    },

    getOneTextlist: async (textlistId) => {

      try {
        const textlist = await Textlist.findOne({
          where: {
            id: textlistId
          }
        });

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
    },
    updateTextlist: async (textlistId, textlistName, isPublic) => {
      let success = null;
      await Textlist.update({
        titulo: textlistName,
        slug: slugify(textlistName , { lower: true }),
        public: isPublic
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