const { forum } = require("../services/forum.service");

module.exports = {
  forumControler: {
    forum: forum.index,
  },
};