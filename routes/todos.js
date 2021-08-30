const router = require("express").Router();
const todo = require("../models/todo");

router.post("/", async (req, res) => {
  //console.log(req.body);
  const newPost = new todo(req.body);

  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const getall = await todo.find();
    res.status(200).json(getall);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
