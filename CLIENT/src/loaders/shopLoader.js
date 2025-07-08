import {getArticleById, getArticles} from "../apis/article.api";

export async function shopLoader() {
  return getArticles();
}

export async function detailLoader(id) {
  return getArticleById(id);
}
