import http from "../http";

export async function getAllCharacters({
  limit = 12,
  page = 1,
  sort = "name",
  name = "",
  signal,
}) {
  const { data: raw } = await http.get(
    `characters?limit=${limit}&page=${page}&sort=${sort}${
      name.length === 0 ? "" : `&name[regex]=${name}`
    }`,
    {
      signal,
    },
  );

  if (signal.aborted) throw new Error("Aborted");

  const { data, totalPages } = raw;

  return { data, totalPages } || null;
}

export async function getCharacter(id) {
  const { data: raw } = await http.get(`characters/${id}`);
  const { data } = raw;
  return data || null;
}

export async function getTop10Searched() {
  const { data: raw } = await http.get(`characters?limit=10&sort=-searched`);
  const { data } = raw;
  return data || null;
}

export async function getCommentsByCharacter(id) {
  const { data: raw } = await http.get(
    `characters/${id}/comments?sort=-createdAt`,
  );
  const { data } = raw;
  return data || null;
}

export async function createComment({ id, text }) {
  const { data: raw } = await http.post(`characters/${id}/comments`, {
    text,
  });
  const { data } = raw;
  return data || null;
}

export async function updateComment({ id, text }) {
  const { data: raw } = await http.patch(`comments/${id}`, {
    text,
  });
  const { data } = raw;
  return data || null;
}

export async function deleteComment(id) {
  await http.delete(`comments/${id}`);
  return id;
}
