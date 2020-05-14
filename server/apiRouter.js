const express = require('express');
const apiRouter = express.Router();
const userController = require('./controllers/userController');
const followController = require('./controllers/followController');
const bidController = require('./controllers/bidController');
const cors = require('cors');

apiRouter.use(cors());

apiRouter.post('/getHomeFeed', userController.apiMustBeLoggedIn, userController.apiGetHomeFeed);

apiRouter.get('/', (req, res) => res.json('API BACKEND'));
apiRouter.post('/login', userController.apiLogin);
apiRouter.post('/register', userController.apiRegister);

apiRouter.post('/doesUsernameExist', userController.apiDoesUsernameExist);
apiRouter.post('/doesEmailExist', userController.apiDoesEmailExist);

apiRouter.post('/checkToken', userController.apiCheckToken);

// PROFILE
apiRouter.post('/profile/:username', userController.ifUserExists, userController.sharedProfileData, userController.profileBasicData);
apiRouter.get('/profile/:username/bids', userController.ifUserExists, userController.apiGetBidsByUsername);
apiRouter.get('/profile/:username/followers', userController.ifUserExists, userController.profileFollowers);
apiRouter.get('/profile/:username/following', userController.ifUserExists, userController.profileFollowing);

// follow routes
apiRouter.post('/addFollow/:username', userController.apiMustBeLoggedIn, followController.apiAddFollow);
apiRouter.post('/removeFollow/:username', userController.apiMustBeLoggedIn, followController.apiRemoveFollow);

// BID
apiRouter.get('/bid/:id', bidController.reactApiViewSingle);
apiRouter.post('/bid/:id/edit', userController.apiMustBeLoggedIn, bidController.apiUpdate);
apiRouter.delete('/bid/:id', userController.apiMustBeLoggedIn, bidController.apiDelete);
apiRouter.post('/create-bid', userController.apiMustBeLoggedIn, bidController.apiCreate);
apiRouter.post('/search', bidController.search);

// EXPORT ROUTER CODE
module.exports = apiRouter;
