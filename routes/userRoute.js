const express = require('express');
const { registerUser, fetchUser, fetchUsers, loginUser, updateUser, deleteUser } = require('../controllers/userController');

const userRoute = express.Router();
userRoute.post('/user/register', registerUser);
userRoute.post('/user/login', loginUser);
userRoute.put('/user/:id', updateUser);
userRoute.delete('/user/:id', deleteUser);
userRoute.get('/user/:id', fetchUser);
userRoute.get('/users', fetchUsers);

module.exports = userRoute;