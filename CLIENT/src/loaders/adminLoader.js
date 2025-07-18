import {getArticles} from "../apis/article.api";

export async function articlesLoader() {
  return getArticles();
}
