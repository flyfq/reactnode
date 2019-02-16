var express = require('express');
var router = express.Router();
let mgd = require("../common/mgd");

router.get('/', function(req, res){
    let username = req.query.username;
    let password = req.query.password;
    console.log(username,password)
    mgd(
        {
            dbName:'user',
            collection:'users'
        },
        (users,client)=>{

            users.find({username:username}).toArray((err,result)=>{
                console.log("kaka",result.length);
                if(result.length==0){
                    users.insertMany([{username:username,password:password}])
                    res.send({error:3,msg:'成功',data:{a:'用户信息'}})
                }else{
                    res.send({error:4,msg:'失败已注册',data:{a:'用户信息'}})
                }
                client.close();
            })
        }
    )

});

module.exports = router;