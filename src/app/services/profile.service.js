const  fs  = require('fs');
const { Users } = require('../repositories/users.repository');
const { Textlists } = require('../repositories/textlists.repository');
const localStorage = require('localStorage');

const cloudinary = require('../utils/cloudinary');

module.exports = {
  profile: {
    private: async (req, res) => {
      try {
        const id = req.id
        const user = await Users.getUserProfile(id);

        let currentPage = req.query.page || 1;
        let postsPerPage = 50;

        if (currentPage == 1) {
          var countAllPosts = await Users.countPosts(id);
          var PageLimit = Math.ceil(countAllPosts.count / postsPerPage);
          if (PageLimit == 0) {
            PageLimit = 1
          }
          localStorage.setItem('profilePageLimit', PageLimit) 
        }

        if (currentPage > localStorage.getItem('profilePageLimit')) {
          currentPage = localStorage.getItem('profilePageLimit');
        } else {
          currentPage = req.query.page || 1;
        }

        let offset = (currentPage * postsPerPage) - postsPerPage;


        const posts = await Users.getUserPosts(id, offset);
        const textlists = await Textlists.getTextlist(id);
        res.render('perfil', {
          textlists,
          user,
          posts,
          pagination: {
            page: currentPage,
            limit: localStorage.getItem('profilePageLimit'),
            totalRows: countAllPosts,
          },
        });

      }
      catch (e) {
        console.log(e);
        res.status(500).json({
          message: e.message
        });
      }
    },

    public: async (req, res) => {
      try {
        const id = req.params.id;
        const user = await Users.getUserProfile(id)
        const publicProfile = await Users.getPublicProfile(id);
        const textlists = await Textlists.getTextlist(id);
        res.render('autor', {
          posts: publicProfile,
          user: user,
          textlists
        });
      }
      catch (e) {
        console.log(e);
        res.status(500).json({
          message: e.message
        });
      }
    },
    updated: async (req, res) => {

      let id = req.id;
      let user = await Users.getUserProfile(id);
      let { user_name, descricao } = req.body;

      if (req.files != null && req.files.profile_img != null) {
        var profile = req.files.profile_img;

        await cloudinary.uploader.destroy(user.profile_id);

        var profileResult = await cloudinary.uploader.upload(profile.tempFilePath);
        profile = profileResult.secure_url;
        var profile_id = profileResult.public_id;
        // delete tmp folder
        
      }
      if (req.files != null && req.files.banner_img !=null ) {
        var banner = req.files.banner_img;

        await cloudinary.uploader.destroy(user.banner_id);

        var bannerResult = await cloudinary.uploader.upload(banner.tempFilePath);
        banner = bannerResult.secure_url;
        var banner_id = bannerResult.public_id;
      }
      const dir = 'tmp';
      fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
      });   
      try {
        const success = await Users.updateUserProfile(user_name, descricao, profile, profile_id, banner, banner_id ,id);
        
        if(success == true) {
       
          req.flash('success_msg', 'Perfil atualizado com sucesso!');
          res.redirect('/perfil');

        } else {
          await req.flash('error_msg', 'Houve um erro :( tente novamente');
          res.redirect('/perfil');
        }

      } catch (e) {
        console.log(e);
      }
    },
    renderUpdate: async (req, res) => {
      let id = req.id;

      if (id == req.params.id) {
        try {
          const user = await Users.getUserProfile(id);
          res.render('updateProfile', {
            user: user
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        req.flash('error_msg', 'Você não tem permissão para acessar esta página');
        res.redirect('/perfil');
      }
    }
  }
};