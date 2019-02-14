let mgd = require("../common/mgd");
/*
mgd(
    {
        dbName:'test',
        collection:'list'
    },
    (list,client)=>{
        list.find({}).toArray((err,result)=>{
            console.log(result);
            // let data = result
            // send(data);
            client.close();
        })
    }
)*/


const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'reactlist';

// Use connect method to connect to the server
MongoClient.connect(url,function(err, client) {

    const db = client.db(dbName);
    console.log('db',db);


    // Get the documents collection
    const collection = db.collection('reactlist');

    console.log('collection',collection);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log(docs)
        callback(docs);
        client.close();
    });

});