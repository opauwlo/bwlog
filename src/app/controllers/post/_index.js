const { validators } = require("../../utils/expressValidator");
const { create } = require("./create");
const { update } = require("./update");
const { deletePost } = require("./delete");
const { renderCreate } = require("./render.create");
const { renderUpdate } = require("./render.update");
const { renderRead } = require("./render.read");
const { renderFromTextlist } = require("./render.fromTextlist");
const { renderPrivateRead } = require("./render.private.read");

module.exports = {
  postController: {
    postValidator: validators.postValidator,
    create: create.index,
    update: update.index,
    delete: deletePost.index,
    //render
    renderCreate: renderCreate.index,
    renderUpdate: renderUpdate.index,
    renderRead: renderRead.index,
    renderPrivateRead: renderPrivateRead.index,
    renderFromTextlist: renderFromTextlist.index
  },
};
