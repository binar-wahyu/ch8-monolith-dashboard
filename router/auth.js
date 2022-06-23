const router = require("express").Router();
const setLayout = require("../middlewares/setLayout");
const { auth } = require("../controllers");

// Routers
router.use(setLayout("authentication"));
router.get("/login", auth.login);
router.get("/register", auth.register);

router.post("/login", auth.api.login);

module.exports = router;
