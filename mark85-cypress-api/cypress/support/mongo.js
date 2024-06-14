const { MongoClient } = require('mongodb')
const mongoURI = 'mongodb+srv://joaotadeu:qax@cluster0.h1jncus.mongodb.net/markdb?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(mongoURI)

async function connect() {
    await client.connect
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }