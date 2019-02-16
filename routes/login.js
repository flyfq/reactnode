var express = require('express');
var router = express.Router();
let mgd = require("../common/mgd")

/* router.get('/', function(req, res){
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // res.setHeader('Access-Control-Allow-Credentials', true);
  console.log('cookies服务',req.query);


  //兜库，看有无用户名,有才种,并取用户信息

  req.session.username=req.query.username;//种
  res.send({error:0,msg:'成功',data:{a:'用户信息'}});

}); */
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
                console.log(result);
                if(result.length==0){
                    // let data = result
                    console.log("1")
                    res.send({error:2,msg:'未注册',data:{a:'用户信息'}})
                } else if(result[0].username==username && result[0].password==password){
                    req.session.username=req.query.username;
                    res.send({error:0,msg:'成功',data:{a:'用户信息'}});
                }else if(result[0].username==username && result[0].password!=password){
                    res.send({error:1,msg:'密码输入错误',data:{a:'用户信息'}})
                }
                client.close();
            })
        }
    )
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // console.log('获取cookies',req.session);
    // console.log('获取前端提交信息',req.query);

    // 兜库，看有无用户名,有才种,并取用户信息
    // console.log(req.session);
    // req.session.username=req.query.username;//种  库里面用户的 ID
    // console.log(req.session);
    // res.send({error:0,msg:'成功',data:{a:'用户信息'}});

});

module.exports = router;