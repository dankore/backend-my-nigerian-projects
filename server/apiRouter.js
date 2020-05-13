const express = require('express');
const apiRouter = express.Router();
const userController = require('./controllers/userController');
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get('/', (req, res) => res.json('API BACKEND'));
apiRouter.post('/login', userController.apiLogin);
apiRouter.post('/register', userController.apiRegister);

apiRouter.post('/doesUsernameExist', userController.apiDoesUsernameExist);
apiRouter.post('/doesEmailExist', userController.apiDoesEmailExist);

apiRouter.post('/checkToken', userController.apiCheckToken);

// PROFILE
apiRouter.post('/profile/:username', userController.ifUserExists, userController.sharedProfileData, userController.profileBasicData)
apiRouter.get('/profile/:username/bids', userController.ifUserExists, userController.apiGetBidsByUsername);
apiRouter.get('/profile/:username/followers', userController.ifUserExists, userController.profileFollowers);
apiRouter.get('/profile/:username/following', userController.ifUserExists, userController.profileFollowing);
module.exports = apiRouter;
