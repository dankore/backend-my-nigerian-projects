const express = require('express');
const apiRouter = express.Router();
const userController = require('./controllers/userController');
const followController = require('./controllers/followController');
const projectController = require('./controllers/projectController');

apiRouter.post('/getHomeFeed', userController.apiMustBeLoggedIn, userController.apiGetHomeFeed);
apiRouter.get('/getHomeFeedIfNotLoggedIn', userController.apiGetHomeFeedIfNotLoggedIn);

apiRouter.get('/', (req, res) => res.json('API BACKEND - MY NIGERIAN PROJECTS.'));
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
apiRouter.post('/updateProfileInfo', userController.apiMustBeLoggedIn, userController.updateProfileInfo);
apiRouter.post('/getProfileById', userController.apiGetProfileById);
apiRouter.get('/profile/:username/bids', userController.ifUserExists, userController.apiGetUserBids)

// ACCOUNT
apiRouter.post('/delete-account', userController.apiMustBeLoggedIn, userController.apiDeleteAccount);

// PASSWORD RESET
apiRouter.post('/reset-password', userController.apiResetPassword);
apiRouter.get('/reset-password/:token');
apiRouter.post('/choose-new-password', userController.apiVerifyPasswordResetToken);
apiRouter.post('/save-new-password', userController.apiSaveNewPassword);

// USERNAME CHANGE
apiRouter.post('/recover-username', userController.apiRecoverUsername);

// FOLLOW
apiRouter.post('/addFollow/:username', userController.apiMustBeLoggedIn, followController.apiAddFollow);
apiRouter.post('/removeFollow/:username', userController.apiMustBeLoggedIn, followController.apiRemoveFollow);

// PROJECT
apiRouter.get('/project/:id', projectController.apiViewSingleProject);
apiRouter.post('/project/:id/edit', userController.apiMustBeLoggedIn, projectController.apiUpdateProject);
apiRouter.delete('/project/:id', userController.apiMustBeLoggedIn, projectController.apiDeleteProject);
apiRouter.post('/create-project', userController.apiMustBeLoggedIn, projectController.apiCreateProject);
apiRouter.post('/search', projectController.search);
apiRouter.post('/change-profile-pic', userController.apiMustBeLoggedIn, userController.apiChangeAvatar);

// BID
apiRouter.post('/create-bid', userController.apiMustBeLoggedIn, projectController.apiCreateBid);
apiRouter.post('/view-single-bid', projectController.apiGetSingleBid);
apiRouter.delete('/delete-bid', userController.apiMustBeLoggedIn, projectController.apiDeleteBid);
apiRouter.post('/edit-bid', userController.apiMustBeLoggedIn, projectController.apiEditBid);


// EXPORT ROUTER CODE
module.exports = apiRouter;
