var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');

var url = "mongodb://train:ALAala123,.-@74.208.16.217:28021"



///////////////////////////////////////////////////////////////////////

// FIND 
export async function FindData( query, proyect, collection) {
    
    if (  proyect == "" || collection == "") {
        return false
    } else {
        const db = await MongoClient.connect(url);
        const dbo = db.db(proyect);
        const MyCollection = dbo.collection(collection);
        // console.log(query, proyect, collection);
        let result = await MyCollection.find(query).toArray();        
        db.close();
        return result
    }
}
// INSERT
export async function InsertData(body, proyect, collection) {
    if (  proyect == "" || collection == "") {
        return false
    } else {
        let newvalues = { $set: body };
        const db = await MongoClient.connect(url);
        const dbo = db.db(proyect);
        const MyCollection = dbo.collection(collection);
        let result = await MyCollection.insertOne(body);        
        db.close();
        return result
    }
}

// UPDATE
export async function UpgrateData(body, query, proyect, collection) {
    if (body == "" || query == "" || proyect == "" || collection == "") {
        return false
    } else {
        // let query = { "zona": body.zona }
        let newvalues = { $set: body };
        const db = await MongoClient.connect(url);
        const dbo = db.db(proyect);
        const MyCollection = dbo.collection(collection);
        let result = await MyCollection.updateOne(query, newvalues);
        if (result.modifiedCount == 0 && result.upsertedCount == 0 && result.matchedCount == 0 ) {        
            result = await MyCollection.insertOne(body);
        } else {
            //   
        }
        db.close();
        return result
    }
}

// DELETE
export async function DeleteData(query, proyect , collection) {
    if ( query == "" || proyect == "" || collection == "") {
        return false
    } else {
        // let query = { "can": body.can, "pin": body.pin }
        const db = await MongoClient.connect(url);
        const dbo = db.db( proyect );
        const MyCollection = dbo.collection(collection);
        const result = await MyCollection.deleteOne(query);
        db.close();
        return result
    }
}
