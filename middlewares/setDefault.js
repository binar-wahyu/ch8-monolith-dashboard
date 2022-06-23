module.exports = (req, res, next) => {
  res.locals.contentName = null;
  next();
};
