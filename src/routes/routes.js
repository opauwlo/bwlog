const express = require('express');

const router = express.Router();

const checkAuthenticated = require('../app/middlewares/checkAuthenticated');
const verifyJwt = require('../app/middlewares/verifyJwt');
// Routes

// home router
const { homeController } = require('../app/controllers/home.controller');
router.get('/', homeController.get);


//login router
const { authController } = require('../app/controllers/auth.controller');

router.get('/login', authController.login);
router.post ('/login', authController.loginPost);
router.get('/auth/create', checkAuthenticated, authController.findOrCreate);
router.get('/logout',checkAuthenticated, authController.logout);

// profile router
const { profileController } = require('../app/controllers/profile.controller');

router.get('/perfil', checkAuthenticated, verifyJwt, profileController.privateProfile);
router.get('/autor/:id/:name', profileController.publicProfile);
router.get('/edit/:id', checkAuthenticated, verifyJwt, profileController.renderUpdateProfile);
router.post('/update',  checkAuthenticated, verifyJwt, profileController.updateProfile);

// posts router
const { postController } = require('../app/controllers/post.controller');

router.get('/novo/post', checkAuthenticated, verifyJwt, postController.renderCreatePost);
router.post('/add', checkAuthenticated, verifyJwt, postController.create);
router.get('/posts/:slug', postController.renderPost);
router.get('/edit/post/:id', checkAuthenticated, verifyJwt, postController.renderEditPost);
router.get('/posts/preview/:slug', postController.renderPereviewPost);
router.post('/update/:u_id', checkAuthenticated, verifyJwt, postController.update);
router.post('/deletar/:id', checkAuthenticated, verifyJwt, postController.delete);

// textlists router
router.post('/add/textlist', checkAuthenticated, verifyJwt, postController.createTextlist);
router.post('/textlist/:id',checkAuthenticated, verifyJwt, postController.updateTextlist);
router.post('/deletar/textlist/:id', checkAuthenticated, verifyJwt, postController.deleteTextlist);
router.get('/novo/textlist', checkAuthenticated, verifyJwt, postController.renderCreateTextlist);
router.get('/edit/textlist/:id', checkAuthenticated, verifyJwt, postController.renderEditTextlist);
router.get('/textlist/:id/:slug', postController.renderPostsFromTextlist);
// forum router
const { forumControler } = require('../app/controllers/forum.controller');
router.get('/forum/:id/:slug', forumControler.forum);

// 404 router
const { errorController } = require('../app/controllers/error.controller')
router.get('*', errorController.erro404);

module.exports = router;