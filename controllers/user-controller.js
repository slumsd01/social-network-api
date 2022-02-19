const {User} = require('../models')

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    
    // GET a single user by its _id and populated thought and friend data
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .then(dbUserData => {
            // send 404 if no user is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    },

    // POST a new user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // PUT to update a user by its _id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUserData => {
            // send 404 if no user is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    },

    // DELETE to remove user by its _id
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            // send 404 if no user is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    }, 

    // POST to add a new friend to a user's friend list
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$addToSet: {friends: params.friendId}}
        )
        .then(dbUserData => {
            // send 404 if no user is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: {friends: params.friendId}},
        )
        .then(dbUserData => {
            // send 404 if no user is found
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.staus(400).json(err)
        })
    }
}

module.exports = userController;