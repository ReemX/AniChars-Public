import http from "../http";

export async function searchMixed(query) {
  const { data: raw } = await http.get(`search/mixed/${query}?limit=3`);
  const { data } = raw;
  return data || null;
}

export async function searchSpecific({ query, resource = "character", page }) {
  const { data: raw } = await http.get(
    `search/${resource}/${query}?limit=10&page=${page}`,
  );
  const { data, pagination } = raw;
  if (!pagination || data?.length === 0)
    throw new Error("Failed to get search results");

  return { data, pagination } || null;
}
