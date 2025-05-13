import React from "react";

const rooms = [
  { id: "room_8_mixed", name: "混住八人间", price: 10 },
  { id: "room_4_mixed", name: "混住四人间", price: 12 },
  { id: "room_3_female", name: "女生三人间", price: 14 },
];

export default function RoomList() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">房型展示</h1>
      {rooms.map((room) => (
        <div key={room.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{room.name}</h2>
          <p>价格：€{room.price} / 晚</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            立即预订
          </button>
        </div>
      ))}
    </div>
  );
}
