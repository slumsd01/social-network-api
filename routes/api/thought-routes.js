const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

// GET at api/thoughts
router.route('/').get(getAllThoughts)

// POST at api/thoughts/<userId>
router.route('/:userId').post(createThought)

// GET single thought & UPDATE at api/thoughts/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
;

// DELETE at api/<userId><thoughtId>
router.route('/:userId/:thoughtId').delete(deleteThought)

module.exports = router;