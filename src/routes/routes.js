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

router.get('/perfil', verifyJwt, checkAuthenticated, profileController.privateProfile);
router.get('/autor/:name/:id', profileController.publicProfile);
router.get('/edit/:id', verifyJwt, checkAuthenticated, profileController.renderUpdateProfile);
router.post('/update', verifyJwt, checkAuthenticated, profileController.updateProfile);

// posts router
const { postController } = require('../app/controllers/post.controller');

router.get('/novo/post', verifyJwt, checkAuthenticated, postController.renderCreatePost);
router.post('/add', verifyJwt, checkAuthenticated, postController.create);
router.get('/posts/:slug', postController.renderPost);
router.get('/edit/post/:id', verifyJwt, checkAuthenticated, postController.renderEditPost);
router.get('/posts/preview/:slug', postController.renderPereviewPost);
router.post('/update/:id', verifyJwt, checkAuthenticated, postController.update);
router.post('/deletar/:id', verifyJwt,checkAuthenticated, postController.delete);

// textlists router
router.post('/add/textlist', verifyJwt, checkAuthenticated, postController.createTextlist);
router.post('/textlist/:id', postController.updateTextlist);
router.post('/deletar/textlist/:id', verifyJwt, checkAuthenticated, postController.deleteTextlist);
router.get('/novo/textlist', verifyJwt, checkAuthenticated, postController.renderCreateTextlist);
router.get('/edit/textlist/:id', verifyJwt, checkAuthenticated, postController.renderEditTextlist);
router.get('/textlist/:slug/:id', postController.renderPostsFromTextlist);
// forum router
const { forumControler } = require('../app/controllers/forum.controller');
router.get('/forum/:id/:slug', forumControler.forum);

// 404 router
const { errorController } = require('../app/controllers/error.controller')
router.get('*', errorController.erro404);

module.exports = router;