const BASE_URL = import.meta.env.VITE_BACK + "/auth";

export async function signin(values) {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": "HttpOnly",
      },
      credentials: "include",
    });
    const userConnected = await response.json();

    // soit on récupère un utilisateur, soit un message
    return userConnected;
  } catch (error) {
    console.log(error);
  }
}

export async function signup(values) {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": "HttpOnly",
      },
    });
    const message = await response.json();
    console.log(message);

    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/current`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": "HttpOnly",
      },
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  await fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: "include",
  });
}
