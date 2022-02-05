const { posts } = require('../services/posts.service');

module.exports = {
  postController: {
    create: posts.create,
    update: posts.update,
    delete: posts.delete,
    //render pages
    renderPost: posts.renderPost,
    renderCreatePost: posts.renderCreate,
    renderEditPost: posts.renderEdit,
    renderPereviewPost: posts.renderPreview,
    // textlists
    createTextlist: posts.createTextlist,
    updateTextlist: posts.updateTextlist,
    deleteTextlist: posts.destroyTextlist,
    
    // render textlists
    renderCreateTextlist: posts.renderCreateTextlist,
    renderEditTextlist: posts.renderEditTextlist,
    renderPostsFromTextlist: posts.renderPostsFromTextlist,
  },
};
