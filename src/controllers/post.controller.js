const Post = require('../models/Post');
const User = require('../models/User');
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
  },
};
