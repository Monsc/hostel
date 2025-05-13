import { MongoClient } from 'mongodb';

let client = null;

export async function connectToDatabase(uri) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
  }
}
