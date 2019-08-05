import request from "@/https/request";

export default {

  ownInfo: async () => {
    return request("/app/userInfo/ownInfo", {method: 'POST', data: {}});
  },
}
