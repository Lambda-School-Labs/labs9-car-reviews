const express = require('express');
const app = express();
const cors = require('cors');
const SERVER_CONFIGS = require('./constants/server');

const configureRoutes = require('./routes');

app.use(express.json());
app.use(cors());

configureRoutes(app);

const trackReviewRoutes = require('./routes/trackReviewRoutes');
const albumReviewRoutes = require('./routes/albumReviewRoutes');
// const userRoutes = require('./routes/userRoutes.js');
const spotifyTokenRoutes = require('./routes/spotifyTokenRoutes')

// track reviews route
app.use('/track_reviews', trackReviewRoutes);

// album reviews route
app.use('/album_reviews', albumReviewRoutes);

// user route
// app.use('/user', userRoutes);

app.use('/spotify_token', spotifyTokenRoutes);

app.listen ((process.env.PORT || 9000), error => {
    if (error) throw error;
    console.log(`Server running on port: ${SERVER_CONFIGS.PORT}`);
});
