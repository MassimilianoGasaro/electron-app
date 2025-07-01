import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // URI del tuo server MongoDB
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connessione a MongoDB riuscita.');
    return client.db('electronApp'); // Nome del database
  } catch (error) {
    console.error('Errore durante la connessione a MongoDB:', error);
    throw error;
  }
}

export async function getData() {
  const db = await connectToDatabase();
  const collection = db.collection('dati'); // Nome della collezione
  return await collection.find({}).toArray();
}

export async function addData(data) {
  const db = await connectToDatabase();
  const collection = db.collection('dati');
  return await collection.insertOne(data);
}