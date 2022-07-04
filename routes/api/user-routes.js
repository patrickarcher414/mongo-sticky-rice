const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:<userId>
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:<userId>/friends/:<friendsId>
router
  .route('/:userId/friends/:friendsId')
  .post(addFriend)
  .delete(removeFriend)

module.exports = router;