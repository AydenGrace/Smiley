const BASE_URL = import.meta.env.VITE_BACK + "/stats";

export async function getAllStats() {
  try {
    const response = await fetch(`${BASE_URL}/`, {
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
