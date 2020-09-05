var express = require('express');
var router = express.Router();
const Modal = require('../models/assets.model');

router.get('/listAll', function(req, res, next) {
    Modal.listAll((err, result) => {
        res.json(result);
    });
});

module.exports = router;
