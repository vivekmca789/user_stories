var express = require('express'),router = express.Router();
var { register,commonstudents,suspend,retrievefornotifications } = require('../controller/apiControl');
router.post('/register', register);
router.get('/commonstudents', commonstudents);
router.post('/suspend', suspend);
router.post('/retrievefornotifications',retrievefornotifications);
module.exports = router;


