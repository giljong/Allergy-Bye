const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
    if(req.session.user === undefined){
        res.render('register')
    }
    res.send('<script type="text/javascript">alert("이미 로그인 되어있습니다.");window.location.href="/";</script>')
})

module.exports = router;