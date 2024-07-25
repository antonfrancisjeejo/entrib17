const router = require("express").Router();
const verifyToken = require("../middlewares/verify");
const Users = require("../models/Users");

router.get("/", (req, res) => {
  res.send("User Route is working");
});

router.get("/all", verifyToken, async (req, res) => {
  try {
    const data = await Users.find();
    res.json({ users: data });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const data = await Users.create(req.body);
    res.json({ msg: "User Added successfully" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const data = await Users.findByIdAndDelete(req.params.id);
    res.json({ msg: "User got removed successfully" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
