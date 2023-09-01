import { ObjectId, MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let dbPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  dbPromise = global._mongoClientPromise.then(c => c.db(process.env.MONGODB_DB))
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  dbPromise = client.connect().then(c => c.db(process.env.MONGODB_DB))
}

const create = async (collection, objToAdd) => {
    const db = await dbPromise
    return db.collection(collection).insertOne(objToAdd)
}

const read = async collection => {
    const db = await dbPromise
    return db.collection(collection).find({}).limit(20).sort({_id: -1}).toArray()
}

const readOne = async (collection, id) => {
    const db = await dbPromise
    return db.collection(collection).findOne({
        _id: new ObjectId(id)
    })
}

const updateOne = async (collection, id, objToUpdate) => {
    const db = await dbPromise
    return db.collection(collection).updateOne({_id: new ObjectId(id)}, {$set: objToUpdate})
}

const deleteOne = async (collection, id) => {
    const db = await dbPromise
    return db.collection(collection).deleteOne({_id: new ObjectId(id)})
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
// export default dbPromise

const DB = {
    create,
    read,
    readOne,
    updateOne,
    deleteOne,
}

export default DB