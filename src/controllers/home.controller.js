require('../middlewares/checkAuthenticated')
const Post = require('../models/Post');
const User = require('../models/User');
require('dotenv').config();

// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

module.exports = { 
    homeController: {
      get: (req, res) => {
        Post.findAll({
            order: [['id', 'DESC']],
            include: [{
              model: User,
              as: 'user',
            }],
            where: {
              publicado: true,
            },
          }).then((posts) => {
            res.render('home', {
              posts: posts,
            });
          });
      },

      post: (req, res) => {
        let token = req.body.token;
        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
          });
          
        }
        verify()
          .then(() => {
            res.cookie('session-token', token);
            res.send('success');
          })
          .catch(console.error);
      }
    },
  };