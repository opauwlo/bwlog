const Post = require("../../database/models/Post");
const User = require("../../database/models/User");
const Reports = require("../../database/models/Reports");

module.exports = {
  Admin: {
    // count all posts
    countPosts: async () => {
      try {
        const count = await Post.count();
        return count;
      }
      catch (err) {
        console.log(err);
      }
    },
    // count users
    countUsers: async () => {
      try {
        const count = await User.count();
        return count;
      }
      catch (err) {
        console.log(err);
      }
    },

    // get reports
    getReports: async () => {
      try {
       const reports = await Reports.findAll();

        return JSON.parse(JSON.stringify(reports));; 
      }
      catch (err) {
        console.log(err);
      }
    },
    getUser: async (user_id) => {
      try {
        const user = await User.findOne({
          where: {
            id: user_id,
          },
        });
        return JSON.parse(JSON.stringify(user));
      }
      catch (err) {
        console.log(err);
      }
    },
    getText: async (text_id) => {
      try {
        const text = await Post.findOne({
          where: {
            id: text_id,
          },
        });
        return JSON.parse(JSON.stringify(text));
      }
      catch (err) {
        console.log(err);
      }
    }
    
  },
};
