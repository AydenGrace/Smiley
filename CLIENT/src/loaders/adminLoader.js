import {getArticles} from "../apis/article.api";
import {getAllOrders} from "../apis/order.api";

export async function articlesLoader() {
  return getArticles();
}

export async function ordersLoader() {
  return getAllOrders();
}
