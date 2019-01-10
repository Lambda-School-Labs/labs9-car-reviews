const express = require ('express');
const server = express ();
const cors = require ('cors');

server.use (express.json ());
server.use (cors ());

const reviewRoutes = require ('./routes/reviewRoutes');
const userRoutes = require ('./routes/userRoutes.js');
// reviews route
server.use ('/reviews', reviewRoutes);

// user route
server.use ('/user', userRoutes);

server.listen ((process.env.PORT || 9000));