const { profile } = require('../services/profile.service');

module.exports = {
  profileController: {
    privateProfile: profile.private, // private profile 
    publicProfile: profile.public, // public profile
    updateProfile: profile.updated, // update profile
    renderUpdateProfile: profile.renderUpdate, // render update profile
  },
};