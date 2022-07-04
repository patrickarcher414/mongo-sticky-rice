const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  addFriend( { params }, res) {
    User.findOneAndUpdate({_id: params.userId},
        {$push: { friends: params.friendId }}, 
        {new:true})
      .then ((dbUserData) => {
        res.json(dbUserData);
      })
      .catch ((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  removeFriend( { params }, req, res) {
    User.findOneAndUpdate({_id: req.params.userId},
        {$pull: { friends: req.params.friendId }}, 
        {new:true})
      .then((dbUserData) => {
        res.json(dbUserData);
      }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  }
};

module.exports = userController;
