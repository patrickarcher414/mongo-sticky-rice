const { Thought } = require('../models');
 
const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({req})
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought  with this id' });
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addThought({params, body}, res) {
    Thought.create(body)
        .then(({_id}) => {
            return User.findById(
                {_id: params.id},
                {$push: {thoughts: _id}},
                {new: true}
                )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

  // update thought by id
  updateThought({params, body}, res) {
    Thought.findByIdAndUpdate(
        {_id: params.id},
        body,
        {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.send(404).json({message: 'No thought with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.send(404).json({message: 'No thought with this id'});
            return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  addReaction({ body }, res) {
    Thought.friends.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.friends.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
