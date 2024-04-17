import http from "../http";

export async function mutateLikeStatus({ id, likeType, action }) {
  if (!(likeType === "characters" || likeType === "series")) {
    throw new Error("Invalid like type");
  }

  if (!(action === "post" || action === "delete")) {
    throw new Error("Invalid action");
  }

  const { data: raw } = await http[action](`favorites/${likeType}/${id}`);
  const { data } = raw;
  return data || null;
}

export async function createRating({ id, rating }) {
  const { data: raw } = await http.post(`characters/${id}/ratings`, {
    rating,
  });
  const { status, data } = raw;
  if (status !== "success") throw new Error("could not create rating!");
  return data || null;
}

export async function updateRating({ id, rating }) {
  const { data: raw } = await http.patch(`ratings/${id}`, {
    rating,
  });
  const { status, data } = raw;
  if (status !== "success") throw new Error("could not update rating!");
  return data || null;
}

export async function updateUserDetails(formData) {
  const { data: raw } = await http.patch(`users/updateDetails`, formData);
  const { data, status, message } = raw;
  if (status !== "success") throw new Error(message);
  return data || null;
}
