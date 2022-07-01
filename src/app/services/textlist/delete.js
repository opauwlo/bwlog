const { Textlists } = require("../../repositories/textlists.repository");

module.exports = TextlistsDeleteService = {
    main: async (id) => {
      const destroyTextlist = await Textlists.deleteTextlist(id);
      return destroyTextlist;
    },
};
