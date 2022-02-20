const { validators } = require('../../utils/expressValidator');
const { create } = require('./create');
const { update } = require('./update');
//const { delete: deletePost } = require('./delete');
const { renderUpdate } = require('./render.update');
const { renderPrivateProfile } = require('./render.privateProfile');
const { renderPublicProfile } = require('./render.publicProfile');
module.exports = {
  userController : {
    userValidator: validators.userValidator,
    create: create.index,
    update: update.index,
    //delete: deletePost.index, 
    //render user
    renderUpdate: renderUpdate.index,
    renderPublicProfile: renderPublicProfile.index,
    renderPrivateProfile: renderPrivateProfile.index,
  }
}