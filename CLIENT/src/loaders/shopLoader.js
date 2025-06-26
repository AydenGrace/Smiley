import {getArticles} from "../apis/article.api";

export async function shopLoader() {
  return getArticles();
}
