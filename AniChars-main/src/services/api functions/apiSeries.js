import http from "../http";

export async function getSeries(id) {
  const { data: raw } = await http.get(`series/${id}`);
  const { data } = raw;

  return data || null;
}

export async function getCharactersBySeries(id) {
  const { data: raw } = await http.get(`series/${id}/search`);
  const { data } = raw;

  return data || null;
}
