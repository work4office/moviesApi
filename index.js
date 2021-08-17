const mongoose = require('mongoose');
const genres = require('./routes/genre');
const tags = require('./routes/tag');
const casts = require('./routes/cast');
const movies = require('./routes/movie');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://work4office13:myINDIA2020*@chatapp.g3zdo.mongodb.net/movies?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/tags', tags);
app.use('/api/casts', casts);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));