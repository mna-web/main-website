const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const StorySchema = new Schema({
  id: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  photo_url: {
    type: String,
  },
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
  },
  city: {
    type: String,
  },
  county: {
    type: String,
  },
  state: {
    type: String,
  },
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  upvotes: {
    type: Number,
  },
  nominations: {
    type: Number,
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model('stories', StorySchema);

module.exports = Story;
