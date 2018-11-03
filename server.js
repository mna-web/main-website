require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/posts.js');
const stories = require('./routes/api/stories.js');

const app = express();

// Body parser middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const dbURI = require('./config/keys_dev.js').mongoURI;

const dbURL = process.env.DB_HOST || dbURI;
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(dbURL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/stories', stories);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('./client/public'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
} else {
  // serve static files
  app.use('/', express.static(path.join(__dirname, './client/public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(port, () =>
  console.log(`Server's good to go on port ${port}... and may I say... you have got it going on today!`));
