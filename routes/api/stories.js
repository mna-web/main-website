const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Story model
const Story = require('../../models/Story');
// Load Profile model
const Profile = require('../../models/Profile');

// Validation
const validateStoryInput = require('../../validation/story');

// @route   GET api/stories/test
// @desc    Tests stories route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Stories Works' }));

// @route   GET api/stories/zipcode
// @desc    Fetches stories
// @access  Public
router.get('/zipcode', async (req, res) => {
  console.log('STORIES ROUTES ABOUT TO CALL TO MLAB');
  let { ID } = req.query;
  ID = Number(ID);
  Story.find({ zipcode: ID }, null, { sort: { upvotes: -1 } }, (err, stories) => {
    console.log('STORIES RETREIVED:');
    res.send(stories);
  });
});

// @route   GET api/stories
// @desc    Fetches stories
// @access  Public
router.get('/', (req, res) => {
  Story.find()
    .sort({ date: -1 })
    .then(stories => res.json(stories))
    .catch(err => res.status(404).json({ nostoriesfound: 'No stories found' }));
});

// @route   GET api/stories/:id
// @desc    Fetches stories by id
// @access  Public
router.get('/:id', (req, res) => {
  Story.findById(req.params.id)
    .then(story => res.json(story))
    .catch(err => res.status(404).json({ nostoryfound: 'No story found with that ID' }));
});

// @route   POST api/stories/publish
// @desc    Publish story
// @access  Public
router.post('/publish', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateStoryInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newStory = new Story({
    id: req.body.id,
    user: req.user.id,
    photo_url: req.body.photo_url,
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
    zipcode: req.body.zipcode,
    city: req.body.city,
    county: req.body.county,
    state: req.body.state,
    upvotes: 0,
    nominations: 0,
    tag: req.body.tag,
  });

  newStory
    .save()
    .then(story => res.json(story))
    .catch(err => console.log(err));
});

// @route   DELETE api/stories/:id
// @desc    Delete story
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Story.findById(req.params.id)
      .then((story) => {
        // Check for post owner
        if (story.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        // Delete
        story.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
  });
});

// @route   POST /api/stories/vote/:id
// @desc    Vote for story
// @access  Private
router.post('/vote/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Story.findById(req.params.id)
      .then((story) => {
        if (story.votes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadyvoted: 'User already voted for this story' });
        }

        // Add user id to likes array
        story.votes.unshift({ user: req.user.id });

        story.save().then(story => res.json(story));
      })
      .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
  });
});

// @route   POST /api/stories/unvote/:id
// @desc    Unvote for story
// @access  Private
router.post('/unvote/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Story.findById(req.params.id)
      .then((story) => {
        if (story.votes.filter(vote => vote.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ alreadyvoted: 'You have not yet liked this post' });
        }

        // Get remove index
        const removeIndex = story.votes.map(item => item.user.toString()).indexOf(req.user.id);

        // Splice out of array
        story.votes.splice(removeIndex, 1);

        // Save
        story.save().then(story => res.json(story));
      })
      .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
  });
});

// @route   POST /api/stories/comment/:id
// @desc    Add comment to story
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateStoryInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Story.findById(req.params.id)
    .then((story) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      // Add to comments array
      story.comments.unshift(newComment);

      // Save
      story.save().then(story => res.json(story));
    })
    .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
});

// @route   DELETE /api/stories/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Story.findById(req.params.id)
      .then((story) => {
        // Check to see if comment exists
        if (
          story.comments.filter(comment => comment._id.toString() === req.params.comment_id)
            .length === 0
        ) {
          return res.status(404).json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = story.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        story.comments.splice(removeIndex, 1);

        story.save().then(story => res.json(story));
      })
      .catch(err => res.status(404).json({ storynotfound: 'No story found' }));
  },
);

// @route   Post /api/stories/upnom
// @desc    Update nomination count
// @access  Public
router.post('/upNom', async (req, res) => {
  const { nomCount, ID } = req.body.data;
  Story.updateOne({ _id: ObjectId(ID) }, { $set: { nominations: Number(nomCount) + 1 } }, (err) => {
    if (err) throw err;
    res.end();
  });
});

module.exports = router;
