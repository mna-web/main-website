const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   POST api/posts
// @desc    Create
// @access  Public

module.exports = router;
