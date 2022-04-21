const express = require('express');
const path = require('path');
const router = express.Router();

const pillsController = require('./pillsController')

router.get('/libraries', pillsController.getLibraryList, (req, res) => {
    return res.status(200).json(res.locals.libraries)
})

router.get('/', pillsController.getLibrary, (req, res) => {
    return res.status(200).json(res.locals.books);
})

router.post('/remove', pillsController.removeBook, (req, res) => {
    return res.status(200)
})

router.post('/addbook', pillsController.addBook, (req, res) => {
    return res.status(200)
})

module.exports = router;