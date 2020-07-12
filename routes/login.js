const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
    if(req.session.user === undefined){
        res.render('login')
    }
    res.send('<script type="text/javascript">alert("이미 로그인 되어있습니다.");window.location.href="/";</script>')
})
.post('/',(req, res) =>{
    const {
        id,pw
    } = req.body;
    if(req.session.user !== undefined){
        res.send('<script type="text/javascript">alert("이미 로그인 되어있습니다.");window.location.href="/";</script>')
    }
    db.query('select * from Users where ID=? and PW=?',[id,pw],(err,result) =>{
        if(err) console.log(err);
        if(result.length===0){
             res.send('<script type="text/javascript">alert("로그인 실패");window.location.href="/login";</script>')
        }
        else{
            req.session.user = {
                id,
                flag : result[0].FLAG
            }
            req.session.save(() =>{
                res.send('<script type="text/javascript">alert("로그인 성공");window.location.href="/";</script>')
            })
        }
    })

})

module.exports = router;
