const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://wninn:XL4fX3DEiO7aKhU3@joybooksystem.in8o5ka.mongodb.net/?retryWrites=true&w=majority&appName=joybooksystem';

// 请根据你的实际房型和 Stripe 价格ID填写
const priceMap = {
  '8bed': 'price_1RCuJvFz3cR3lvSRhH4RQgSV',
  '4bed': 'price_1RCuJOFz3cR3lvSR84VUt8Fp',
  'female3': 'price_1RCuIdFz3cR3lvSRNEzOSSED',
  // 如有更多房型，继续补充
};

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('hostel');
  const rooms = await db.collection('rooms').find().toArray();

  for (const room of rooms) {
    const priceId = priceMap[room.id];
    if (!priceId) {
      console.log(`No priceId for room id: ${room.id}`);
      continue;
    }
    await db.collection('rooms').updateOne(
      { _id: room._id },
      { $set: { stripePriceId: priceId } }
    );
    console.log(`Updated room ${room.id} with stripePriceId: ${priceId}`);
  }

  await client.close();
  console.log('All rooms updated!');
}

main().catch(console.error); 