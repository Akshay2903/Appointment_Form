const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.post('/data', userController.saveDataToDatabase);
router.delete('/delete-user/:id', userController.deleteDataFromDatabase);
router.get('/user-data', userController.getAllData);

module.exports = router;