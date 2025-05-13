export async function handleRooms(request, env) {
  return new Response(
    JSON.stringify({
      rooms: [
        {
          id: "8bed",
          name: { zh: "混住八人间", en: "8-Bed Mixed Dorm" },
          price: 10,
          desc: { zh: "每人每天10欧元", en: "€10/person/night" },
          count: 1
        },
        {
          id: "4bed",
          name: { zh: "混住四人间", en: "4-Bed Mixed Dorm" },
          price: 12,
          desc: { zh: "每人每天12欧元", en: "€12/person/night" },
          count: 1
        },
        {
          id: "female3",
          name: { zh: "女生三人间", en: "3-Bed Female Dorm" },
          price: 14,
          desc: { zh: "每人每天14欧元", en: "€14/person/night" },
          count: 2
        }
      ]
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    }
  );
} 