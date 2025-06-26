const BASE_URL = import.meta.env.VITE_BACK + "/article";

export async function getArticles(values) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      body: JSON.stringify(values),
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
