const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://wninn:XL4fX3DEiO7aKhU3@joybooksystem.in8o5ka.mongodb.net/?retryWrites=true&w=majority&appName=joybooksystem';

// 房型元数据，含数量字段
const roomMeta = {
  mixedDorm8: {
    id: '8bed',
    name: { zh: '混住八人间', en: '8-Bed Mixed Dorm' },
    description: { zh: '每人每天10欧元', en: '€10/person/night' },
    gender: 'mixed',
    image: '/images/8bed.jpg',
    count: 1 // 8人间有1间
  },
  mixedDorm4: {
    id: '4bed',
    name: { zh: '混住四人间', en: '4-Bed Mixed Dorm' },
    description: { zh: '每人每天12欧元', en: '€12/person/night' },
    gender: 'mixed',
    image: '/images/4bed.jpg',
    count: 1 // 4人间有1间
  },
  femaleDorm3: {
    id: 'female3',
    name: { zh: '女生三人间', en: '3-Bed Female Dorm' },
    description: { zh: '每人每天14欧元', en: '€14/person/night' },
    gender: 'female',
    image: '/images/female3.jpg',
    count: 2 // 女生三人间有2间
  }
};

async function main() {
  const client = new MongoClient(uri);
  await client.connect();

  const dbTest = client.db('test');
  const dbHostel = client.db('hostel');

  const rooms = await dbTest.collection('rooms').find().toArray();

  for (const room of rooms) {
    const meta = roomMeta[room.type];
    if (!meta) continue;
    const newRoom = {
      id: meta.id,
      name: meta.name,
      description: meta.description,
      gender: meta.gender,
      image: meta.image,
      beds: room.capacity,
      price: room.price,
      count: meta.count
    };
    await dbHostel.collection('rooms').updateOne(
      { id: newRoom.id },
      { $set: newRoom },
      { upsert: true }
    );
    console.log(`Migrated room: ${room.type} -> hostel.rooms`);
  }

  await client.close();
  console.log('Migration complete!');
}

main().catch(console.error);