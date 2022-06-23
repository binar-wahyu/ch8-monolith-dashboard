const router = require("express").Router();
const setLayout = require("../middlewares/setLayout");
const authenticate = require("../middlewares/authenticate");
const { dashboard } = require("../controllers");

// Routers
router.use(authenticate);
router.use(setLayout("dashboard"));
router.get("/", dashboard.home);
router.get("/post", dashboard.post.index);

module.exports = router;
