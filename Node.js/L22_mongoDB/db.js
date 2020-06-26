const { MongoClient } = require('mongodb');

const mdb = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'myblog';

let _db = null;

async function connectDB() {
    if (!_db) {
        try {
            const client = new MongoClient(url, { useUnifiedTopology: true });
            await client.connect();
            _db = await client.db(dbName);
        } catch (error) {
            throw 'connect fail';
        }
    }
    return _db;
}

exports.getCollection = collection => {
    let _col = null;
    return async() => {
        if (!_col) {
            try {
                const db = await connectDB();
                _col = await db.collection(collection);
            } catch (error) {
                throw 'collection fail'
            }
        }
        return _col;
    }
}