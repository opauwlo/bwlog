const express = require('express');

const router = express.Router();

const checkAuthenticated = require('../middlewares/checkAuthenticated');
// Routes

// home router
const { homeController } = require('../controllers/home.controller');

router.get('/', homeController.get);
router.post ('/', homeController.post);

//login router
const { loginController } = require('../controllers/login.controller');

router.get('/login', loginController.login);
router.get('/verify',checkAuthenticated, loginController.veriyUser);
router.get('/signup',checkAuthenticated, loginController.signup);

router.post('/auth/create', checkAuthenticated, loginController.createUser);

//logout router
const { logoutController } = require('../controllers/logout.controller');

router.get('/logout', logoutController.logout);

// profile router
const { profileController } = require('../controllers/profile.controller');

router.get('/perfil', checkAuthenticated, profileController.privateProfile);
router.get('/autor/:id_user', profileController.publicProfile);


// posts router
const { postController } = require('../controllers/post.controller');

router.post('/add', checkAuthenticated, postController.creat);
router.put('/update/:id', checkAuthenticated, postController.update);
router.post('/deletar/:id', postController.delete);
router.get('/cad', checkAuthenticated, postController.showCreatePost);
router.get('/posts/:slug', postController.showPost);
router.get('/edit/:id', postController.showEditPost);
router.get('/posts/preview/:slug', postController.showPereviewPost);

// forum router
const { forumControler } = require('../controllers/forum.controller');
router.get('/forum/:id/:slug', forumControler.forum);

// 404 router

const { errorController } = require('../controllers/error.controller')
router.get('*', errorController.erro404);

module.exports = router;