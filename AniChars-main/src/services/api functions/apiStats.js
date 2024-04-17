import http from "../http";

export async function getUserDistribution() {
  const { data: raw } = await http.get(`locations/user-distribution`);
  const { data } = raw;
  return data || null;
}

export async function getAllComments() {
  const { data: raw } = await http.get(`comments?sort=-createdAt&limit=100`);
  const { data } = raw;
  return data || null;
}
