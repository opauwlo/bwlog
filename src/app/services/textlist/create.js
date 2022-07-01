const { Textlists } = require("../../repositories/textlists.repository");
const getTitleCase = require("../../utils/getTitileCase");

module.exports = createTextlistService = {
    main: async (ownerId, titulo, isPublic) => {
      try {
        const created = await Textlists.createTextlist(getTitleCase(titulo), ownerId, isPublic);
        return created;
      } catch (e) {
        console.log(e);
      }
    },
};
