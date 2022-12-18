const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const moviesForApproval = require('./moviesForApproval');
const genres = require('./genres');
const admin = require('./admin');
const messages = require('./messages');
const test = require('./test');
const { authController } = require('../controllers');
const { verifySignUp } = require('../utils/index');

router.post('/register', verifySignUp(), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/test', test);
router.use('/movies', movies);
router.use('/moviesForApproval', moviesForApproval);
router.use('/genres', genres);
router.use('/admin', admin);
router.use('/messages', messages);

module.exports = router;
