module.exports = {
  home: (req, res) => res.render("pages/default/index"),
  notFound: (req, res) => res.render("pages/default/not-found"),
  exception: (err, req, res, next) => {
    console.error(err);
    res.render("pages/default/exception");
  },

  dashboard: require("./dashboard"),
  auth: require("./auth"),
};
