const express = require('express');
const path = require('path');
const router = express.Router();

const pillsController = require('./pillsController')

router.get('/users', pillsController.getUsers, (req, res) => {
    return res.status(200).json(res.locals.users)
})

router.get('/libraries', pillsController.getLibraryList, (req, res) => {
    return res.status(200).json(res.locals.libraries)
})

router.get('/', pillsController.getLibrary, (req, res) => {
    return res.status(200).json(res.locals.books);
})

router.post('/remove', pillsController.removeBook, (req, res) => {
    return res.status(200);
})

router.post('/addbook', pillsController.addBook, (req, res) => {
    return res.status(200);
})

router.post('/requestBook', pillsController.requestBook, (req, res) => {
    return res.status(200)
})

router.get('/getRequests', pillsController.getRequests, (req, res) => {
    return res.status(200).json(res.locals.requestedBooks);
})

router.post('/clearRequest', pillsController.clearRequest, (req, res, next) => {
    return res.status(200)
})

router.post('/addRec', pillsController.recommendBook, (req, res) => {
    return res.status(200)
})

router.get('/getRecs', pillsController.getRecommendations, (req, res) => {
    return res.status(200).json(res.locals.recommendedBooks)
})

router.post('/clearRecommendation', pillsController.clearRecommendation, (req, res, next) => {
    return res.status(200)
})

module.exports = router;