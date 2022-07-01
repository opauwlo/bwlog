const paginateHelper = require("../app/utils/pagination");
const moment = require("moment");

const hbsConfig = {
  defaultLayout: "main",
  helpers: {
    formatDate: (createdAt) => {
      return moment(createdAt).format("ll");
    },
    formatDateTime: (createdAt) => {
      return moment(createdAt).format(`MMMM YYYY`);
    },
    paginateHelper: paginateHelper.createPagination,
    resetImg: (img) => {
      // replace img url extension to png
      if (img) {
        return img.replace(/\.[^/.]+$/, ".png");
      } else {
        return img;
      }
    },
    checkIfIsVerified: (verify_user) => {
      // check if user is verified
      if (verify_user) {
        return '<i class="text-light bi bi-file-check"></i>';
      } else {
        return "";
      }
    },
    checkIfIsAdmin: (is_admin) => {
      // check if user is
      if (is_admin) {
        return '<a href="/admin" class="btn btn-outline-dark text-white btn-sm">Admin Page</a>';
      } else {
        return "";
      }
    },
  },
}
module.exports = hbsConfig;