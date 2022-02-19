const {Thought, User} = require('../models')

const thoughtController = {
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    
    // GET to get a single thought by its _id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
        .then(dbThoughtData => {
            // send 404 if no thought is found
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated Thought's thoughts array field)
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(dbUserData => {
            // send 404 if no thought is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    // PUT to update a thought by its _id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
        .then(dbThoughtData => {
            // send 404 if no thought is found
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    },

    // DELETE to remove a thought by its _id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            // send 404 if no thought is found
            if (!deletedThought) {
                return res.status(404).json({message: 'No thought found with this id.'})
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            )
        })
        .then(dbUserData => {
            // send 404 if no thought is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },    
    
    // POST to create a reaction stored in a single thought's reactions array field
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData => {
            // send 404 if no thought is found
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)) 
    }
}


module.exports = thoughtController;