const express = require('express');
const { createNote, updateNote, deleteNote, getNotes } = require('../controllers/noteController');
const { userAuthenticate } = require('../middleware/userAuthentication');
const noteRoutes = express.Router();
noteRoutes.post('/note',userAuthenticate,createNote);
noteRoutes.put('/note/:id',userAuthenticate,updateNote);
noteRoutes.delete('/note/:id',userAuthenticate,deleteNote);
noteRoutes.get('/notes',userAuthenticate,getNotes);
module.exports = noteRoutes;