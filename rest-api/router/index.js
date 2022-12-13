const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const genres = require('./genres');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/test', test);
router.use('/movies', movies);
router.use('/genres', genres);

module.exports = router;
