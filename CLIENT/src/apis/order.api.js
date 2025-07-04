const BASE_URL = import.meta.env.VITE_BACK + "/order";

export async function getUserOrders(id) {
  try {
    const response = await fetch(`${BASE_URL}/currentUser`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
