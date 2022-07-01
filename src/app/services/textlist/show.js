const { Textlists } = require("../../repositories/textlists.repository");

module.exports = ShowTextlistsService = {
    fromOwner: async (id) => {
      const textlistsFromOwner = await Textlists.getTextlistFromOwner(id);
      return textlistsFromOwner;
    },
    publicForOwner: async (id) => {
      const textlistsPublic = await Textlists.getTextlistPublic(id);
      return textlistsPublic;
    },
};
