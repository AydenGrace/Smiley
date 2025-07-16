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

export async function getMyOrderDetails(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/my-details/${orderId}`, {
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

export async function makeOrder(values) {
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
export async function validateOrder(id) {
  try {
    const response = await fetch(`${BASE_URL}/validate/${id}`, {
      method: "PATCH",
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
export async function cancelOrder(id) {
  try {
    const response = await fetch(`${BASE_URL}/cancel/${id}`, {
      method: "PATCH",
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
