const BASE_URL = import.meta.env.VITE_BACK + "/contact";

export async function sendContactForm(values) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
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
