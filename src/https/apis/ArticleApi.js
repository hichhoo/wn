import request from "@/https/request";

export default {

  getArticles: async () => {
    return request("/api/Article/user_get_article", {method: 'POST', data: {}});
  },

  getArticleDetail: async (a_id) => {
    return request("/api/Article/user_get_article_detail", {method: 'POST', data: {a_id}});
  },

}
