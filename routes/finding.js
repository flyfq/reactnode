let express = require("express");
let router = express.Router();
let mgd = require("../common/mgd")

router.get('/', function(req, res){
    console.log('news服务',req.headers.origin);
    // console.log("res",res)
    // res.setHeader('A0ccess-Control-Allow-Origin', req.headers.origin)//当前服务允许跨域
    //兜库-->mysql|mongodb  代理

    // req.session.nikename='bmw2';//req.query.username
    // res.send(data);
    let start = 1;
    let count = 7;

    mgd(
        {
            dbName:'findList',
            collection:'find'
        },
        (find,client)=>{
            find.find({},{limit:start*count,skip:0}).toArray((err,result)=>{
                console.log(result);
                let data = result
                res.send(data);
                client.close();
            })
        }
    )
});

module.exports = router;

