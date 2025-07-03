const BASE_URL = import.meta.env.VITE_BACK + "/user";

export async function modifyEmail(id, email) {
  try {
    console.log(id);

    const response = await fetch(`${BASE_URL}/email/${id}`, {
      method: "PATCH",
      body: JSON.stringify({email}),
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": "HttpOnly",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMyAccount(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": "HttpOnly",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function confirmModifyEmail(token) {
  try {
    const response = await fetch(`${BASE_URL}/confirm-email/${token}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Set-Cookie": "HttpOnly",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
