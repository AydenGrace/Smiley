import {getUserOrders} from "../apis/order.api";

export async function orderLoader() {
  return getUserOrders();
}
