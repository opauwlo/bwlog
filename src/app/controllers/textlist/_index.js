const { create } = require("./create");
const { update } = require("./update");
const { delete: deletePost } = require("./delete");
const { renderCreate } = require("./render.create");
const { renderUpdate } = require("./render.update");
const { validators } = require('../../utils/expressValidator');

module.exports = {
  textlistController: {
    textlistValidator: validators.textlistValidator,
    create: create.index,
    update: update.index,
    delete: deletePost.index,
    //render textlist
    renderCreate: renderCreate.index,
    renderUpdate: renderUpdate.index,
  }
}