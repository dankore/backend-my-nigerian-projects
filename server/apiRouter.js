const express = require('express');
const apiRouter = express.Router();
const userController = require('./controllers/userController');
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get('/', (req, res) => res.json('API BACKEND'));
apiRouter.post('/register', userController.apiRegister);
apiRouter.post('/doesUsernameExist', userController.apiDoesUsernameExist);

module.exports = apiRouter;
