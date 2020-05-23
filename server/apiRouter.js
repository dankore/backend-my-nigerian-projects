const express = require('express');
const apiRouter = express.Router();
const userController = require('./controllers/userController');
const followController = require('./controllers/followController');
const projectController = require('./controllers/projectController');


apiRouter.post('/getHomeFeed', userController.apiMustBeLoggedIn, userController.apiGetHomeFeed);
apiRouter.get('/getHomeFeedIfNotLoggedIn', userController.apiGetHomeFeedIfNotLoggedIn)

apiRouter.get('/', (req, res) => res.json('API BACKEND'));
apiRouter.post('/login', userController.apiLogin);
apiRouter.post('/register', userController.apiRegister);
apiRouter.post('/changePassword', userController.apiChangePassword);

apiRouter.post('/doesUsernameExist', userController.apiDoesUsernameExist);
apiRouter.post('/doesEmailExist', userController.apiDoesEmailExist);

apiRouter.post('/checkToken', userController.apiCheckToken);

// PROFILE
apiRouter.post('/profile/:username', userController.ifUserExists, userController.sharedProfileData, userController.profileBasicData);
apiRouter.get('/profile/:username/projects', userController.ifUserExists, userController.apiGetProjectsByUsername);
apiRouter.get('/profile/:username/followers', userController.ifUserExists, userController.profileFollowers);
apiRouter.get('/profile/:username/following', userController.ifUserExists, userController.profileFollowing);
apiRouter.post('/updateProfileInfo', userController.updateProfileInfo)
// follow routes
apiRouter.post('/addFollow/:username', userController.apiMustBeLoggedIn, followController.apiAddFollow);
apiRouter.post('/removeFollow/:username', userController.apiMustBeLoggedIn, followController.apiRemoveFollow);

// PROJECT
apiRouter.get('/project/:id', projectController.reactApiViewSingle);
apiRouter.post('/project/:id/edit', userController.apiMustBeLoggedIn, projectController.apiUpdate);
apiRouter.delete('/project/:id', userController.apiMustBeLoggedIn, projectController.apiDelete);
apiRouter.post('/create-project', userController.apiMustBeLoggedIn, projectController.apiCreate);
apiRouter.post('/search', projectController.search);

// EXPORT ROUTER CODE
module.exports = apiRouter;
