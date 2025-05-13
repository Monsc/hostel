import React from "react";

const sampleStatus = [
  { roomId: "room_8_mixed", booked: 4, total: 8 },
  { roomId: "room_4_mixed", booked: 2, total: 4 },
  { roomId: "room_3_female", booked: 3, total: 6 },
];

export default function RoomStatus() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">每日房态</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">房型</th>
            <th className="border p-2">已预订</th>
            <th className="border p-2">总床位</th>
          </tr>
        </thead>
        <tbody>
          {sampleStatus.map((room) => (
            <tr key={room.roomId}>
              <td className="border p-2">{room.roomId}</td>
              <td className="border p-2">{room.booked}</td>
              <td className="border p-2">{room.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
