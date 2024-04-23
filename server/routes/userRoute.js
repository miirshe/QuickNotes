const express = require('express');
const { registerUser, fetchUser, fetchUsers, loginUser, updateUser, deleteUser, fetchCurrentUser } = require('../controllers/userController');
const { userAuthenticate } = require('../middleware/userAuthentication');
const userRoute = express.Router();
userRoute.post('/user/register', registerUser);
userRoute.post('/user/login', loginUser);
userRoute.put('/user/:id', updateUser);
userRoute.delete('/user/:id', deleteUser);
userRoute.get('/user/current',userAuthenticate,fetchCurrentUser);
userRoute.get('/user/:id', fetchUser);
userRoute.get('/users', fetchUsers);

module.exports = userRoute;