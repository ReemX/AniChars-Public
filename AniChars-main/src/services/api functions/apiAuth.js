import http from "../http";

export async function login({ username, password }) {
  const { data: raw } = await http.post("users/login", {
    username,
    password,
  });
  const { status, data, message } = raw;

  if (status === "fail") throw new Error(message);

  return data;
}

export async function register({ username, password, passwordConfirm }) {
  const { data: raw } = await http.post("users/signup", {
    username,
    password,
    passwordConfirm,
  });
  const { status, data, message } = raw;

  if (status !== "success") throw new Error(message);

  return data;
}

export async function logout() {
  const { data: raw } = await http.post("users/logout");
  const { status } = raw;
  if (status !== "success") throw new Error("could not logout!");
}

export async function getCurrentUser() {
  const { data: raw } = await http.get("users/me");
  const { data } = raw;

  return data || null;
}
