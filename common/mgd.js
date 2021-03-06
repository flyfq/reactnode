
module.exports = (opts,callback)=>{

  opts = opts||{}
  opts.url=opts.url||'mongodb://localhost:27017';
  
  
  const MongoClient = require('mongodb').MongoClient;//创建连接实例

  MongoClient.connect(opts.url,function(err, client) {

    let db = client.db(opts.dbName);//use 库 使用库

    const collection = db.collection(opts.collection); //连接集合
    
    callback(collection,client)

  })

}