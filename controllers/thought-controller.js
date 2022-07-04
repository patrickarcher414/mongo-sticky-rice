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
    Thought.findOne({ _id: params.thoughtId })
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
          User.findById(
              {_id: params.thoughtId},
              {$push: {thoughts: _id}},
              {new: true}
              )
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

  // update thought by id
  updateThought({params, body}, res) {
    Thought.findByIdAndUpdate(
        {_id: params.thoughtId},
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
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.send(404).json({message: 'No thought with this id'});
            return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
          {_id: req.params.thoughtId }, 
          { $push: {reactions: req.body}},
          {new: true})
        .then((dbThoughtData) => {
            res.json(dbThoughtData); 
        }
    ).catch((err) => { 
        console.log(err); 
        res.status(500).json(err);
    });
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: { reactions: req.body }}, 
        {new: true})
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  }
};

module.exports = thoughtController;
