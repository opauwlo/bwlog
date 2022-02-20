const express = require('express');
const router = express.Router();

const checkAuthenticated = require('../app/middlewares/checkAuthenticated');
const verifyJwt = require('../app/middlewares/verifyJwt');
const getUserImg = require("../app/middlewares/getPofileImg");
// Routes

// home router
router.all('*', getUserImg);
const { homeController } = require("../app/controllers/home/render.home");
router.get("/", homeController.renderHome);

//login router
const { authController } = require("../app/controllers/auth/_index");

router.get("/login", authController.renderLogin);
router.get("/logout", authController.logout);
router.post("/login", authController.login);

// profile router
const { userController } = require('../app/controllers/user/_index');

router.get('/perfil', checkAuthenticated, verifyJwt, userController.renderPrivateProfile);
router.get('/autor/:id/:name', userController.renderPublicProfile);
router.get('/edit/:id', checkAuthenticated, verifyJwt, userController.renderUpdate);
router.get("/auth/create", checkAuthenticated, userController.create);
router.post('/update',  checkAuthenticated, verifyJwt, userController.userValidator, userController.update);

// posts router
const { postController } = require("../app/controllers/post/_index");

router.get("/novo/post", checkAuthenticated, verifyJwt, postController.postValidator, postController.renderCreate);
router.post("/add", checkAuthenticated, verifyJwt, postController.postValidator, postController.create);
router.get("/post/:slug", postController.renderRead);
router.get("/textlist/:id/:slug", postController.renderFromTextlist);
router.get("/edit/post/:u_id", checkAuthenticated, verifyJwt, postController.renderUpdate);
router.get("/post/preview/:slug", postController.renderPrivateRead);
router.post("/update/:u_id", checkAuthenticated, verifyJwt, postController.postValidator, postController.update);
router.post("/deletar/:u_id", checkAuthenticated, verifyJwt, postController.delete);

// textlists router
const { textlistController } = require('../app/controllers/textlist/_index');

router.post('/add/textlist', checkAuthenticated, verifyJwt, textlistController.textlistValidator, textlistController.create);
router.post('/textlist/:id',checkAuthenticated, verifyJwt, textlistController.textlistValidator,textlistController.update);
router.post('/deletar/textlist/:id', checkAuthenticated, verifyJwt, textlistController.delete);
router.get('/novo/textlist', checkAuthenticated, verifyJwt, textlistController.renderCreate);
router.get('/edit/textlist/:id', checkAuthenticated, verifyJwt, textlistController.renderUpdate);

// forum router
const { forumController } = require('../app/controllers/forum/render.forum');
router.get('/forum/:id/:slug', forumController.renderForum);

// 404 router
const { errorController } = require("../app/controllers/error/render.error");
router.get("*", errorController.renderError);

module.exports = router;