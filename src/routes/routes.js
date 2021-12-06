const express = require('express');

const router = express.Router();

const checkAuthenticated = require('../middlewares/checkAuthenticated');
// Routes

// home router
const { homeController } = require('../controllers/home.controller');

router.get('/', homeController.get);


//login router
const { authController } = require('../controllers/auth.controller');

router.get('/login', authController.login);
router.post ('/login', authController.loginPost);
router.get('/auth/create',checkAuthenticated, authController.findOrCreate);
router.get('/logout',checkAuthenticated, authController.logout);

// profile router
const { profileController } = require('../controllers/profile.controller');

router.get('/perfil', checkAuthenticated, profileController.privateProfile);
router.get('/autor/:id_user', profileController.publicProfile);


// posts router
const { postController } = require('../controllers/post.controller');

router.get('/cad', checkAuthenticated, postController.showCreatePost);
router.post('/add', checkAuthenticated, postController.create);
router.get('/posts/:slug', postController.renderPost);
router.get('/edit/:id', postController.showEditPost);
router.get('/posts/preview/:slug', postController.showPereviewPost);
router.post('/update/:id', checkAuthenticated, postController.update);
router.post('/deletar/:id', postController.delete);

// forum router
const { forumControler } = require('../controllers/forum.controller');
router.get('/forum/:id/:slug', forumControler.forum);

// 404 router

const { errorController } = require('../controllers/error.controller')
router.get('*', errorController.erro404);

module.exports = router;