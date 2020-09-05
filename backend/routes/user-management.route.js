var express = require('express');
var router = express.Router();
const Modal = require('../models/user-management.model');

router.get('/FillUsers', function(req, res, next) {
    Modal.FillUsers((err, result) => {
        res.json(result);
    });
});

router.post('/login', function(req, res, next) {
    Modal.authenticate(req.body, (err, result) => {
        res.json(result);
    });
});

module.exports = router;
