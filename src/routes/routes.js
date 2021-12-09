const express = require('express');

const router = express.Router();

const checkAuthenticated = require('../middlewares/checkAuthenticated');
const verifyJwt = require('../middlewares/verifyJwt');
// Routes

// home router
const { homeController } = require('../controllers/home.controller');
router.get('/', homeController.get);


//login router
const { authController } = require('../controllers/auth.controller');

router.get('/login', authController.login);
router.post ('/login', authController.loginPost);
router.get('/auth/create', checkAuthenticated, authController.findOrCreate);
router.get('/logout',checkAuthenticated, authController.logout);

// profile router
const { profileController } = require('../controllers/profile.controller');

router.get('/perfil', verifyJwt, checkAuthenticated, profileController.privateProfile);
router.get('/autor/:name/:id', profileController.publicProfile);
router.get('/edit/:id', verifyJwt, checkAuthenticated, profileController.renderUpdateProfile);
router.post('/update/:id', verifyJwt, checkAuthenticated, profileController.updateProfile);
// posts router
const { postController } = require('../controllers/post.controller');

router.get('/novo/post', verifyJwt, checkAuthenticated, postController.renderCreatePost);
router.post('/add', verifyJwt, checkAuthenticated, postController.create);
router.get('/posts/:slug', postController.renderPost);
router.get('/edit/:id', verifyJwt, checkAuthenticated, postController.renderEditPost);
router.get('/posts/preview/:slug', postController.renderPereviewPost);
router.post('/update/:id', verifyJwt, checkAuthenticated, postController.update);
router.post('/deletar/:id', verifyJwt,checkAuthenticated, postController.delete);

// forum router
const { forumControler } = require('../controllers/forum.controller');
router.get('/forum/:id/:slug', forumControler.forum);

// 404 router

const { errorController } = require('../controllers/error.controller')
router.get('*', errorController.erro404);

module.exports = router;