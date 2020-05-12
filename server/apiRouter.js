const express = require('express');
const apiRouter = express.Router();
const userController = require('./controllers/userController');
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get('/', (req, res) => res.json('API BACKEND'));
apiRouter.post('/register', userController.apiRegister);
apiRouter.post('/doesUsernameExist', userController.apiDoesUsernameExist);
apiRouter.post('/doesEmailExist', userController.apiDoesEmailExist);
apiRouter.post('/checkToken', userController.apiCheckToken);
apiRouter.post('/login', userController.apiLogin);

module.exports = apiRouter;
