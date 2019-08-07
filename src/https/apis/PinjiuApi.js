import request from "@/https/request";
import { returnStatement } from "@babel/types";

export default {

  /**
   * 订单统计
   * @returns {Promise<*>}
   */
  userListInit2: async () => {
    return request("/app/pinjiu/userListInit2", {method: 'POST', data: {}});
  },

  /**
   * 拼单列表
   * @param pageNo
   * @param pageSize
   * @param search
   * @returns {Promise<*>}
   */
  index: async (pageNo, pageSize, search) => {
    return request("/app/pinjiu/index", {method: 'POST', data: {pageNo, pageSize, search}});
  },
  /**
   * 我发起的-按拼单显示
   */
  userList: async (pinjiuStatus, pageSize,pageNo,search) => {
    return request('/app/pinjiu/userList', {method: 'POST',data:{pageNo,pageSize,search}});
  },

  /**
   * 我发起的-按订单显示
   * @returns {Promise<void>}
   */
  userList2: async (pinjiuStatus, pageSize, pageNo, search) => {
    return request('/app/pinjiu/userList2', {method: 'POST', data: {pinjiuStatus, pageSize, pageNo, search}});
  },
/**?
 * 我发起的-按参与者显示（获取card数量）
 */
canyuzhe: async (type, pageNo, pageSize, userNickname) => {
  return request('/app/pinjiuMenu/listUserJoiHistorey',{method: 'POST', data: {type, pageNo, pageSize, userNickname}});
},
/**
 * 我参与的-按订单显示
 */
joinList: async (pinjiuStatus, pageSize, pageNo, search) => {
  return request('/app/pinjiu/joinList2',{method: 'POST', data: {pinjiuStatus, pageSize, pageNo, search}});
},
/**
 * 我参与的-按订单显示 （获取card数量）
 */
joinCount: async () => {
  return request('/app/pinjiu/joinListInit2',{method: 'POST', data: {}});
},

/**
 * 按照发起者显示 
 */
joinUserlist: async (type, pageNo, pageSize, userNickname) => {
  return request('/app/pinjiuMenu/listForJoinUser',{method: 'POST', data: {type, pageNo, pageSize, userNickname}});
},
/**
 * pinjiu-拼单详情
 */
pdxqDetails: async (id) => {
   return request('/app/pinjiu/detail', {method:'POST', data: {id}});
},
/**
 * 订单详情
 */
dindanxiangqing: async (id) => {
  return request('/app/pinjiuMenu/loadPayInfo', {method:'POST', data: {id}});
},
/**
 * 发起者显示详情
 */
faqizhe: async(createUserId,searchUserId,type,pinjiuStatus, pageNo, pageSize) => {
  return request('/app/pinjiuMenu/listAllAppByCreateUser', {method:'POST', data: {createUserId,searchUserId,type,pinjiuStatus, pageNo, pageSize}});
},
/**
 * 显示物流详情 
 */

wuliu: async (id) => {
  return request("/app/pinjiuMenu/wuliu",{method: 'POST', data: {id}})
},
  faqipindan: async () => {
    return request("app/group/mySimpleGroups", {method: 'POST', data: {}});
  },

  pindanxiangqing: async (id) => {
    return request("app/pinjiu/detail", {method: 'POST', data: {id}});
  },

  loadDefaultAddress: async () => {
    return request("app/userAddress/loadDefaultAddress", {method: 'POST', data: {}});
  },

  getAddressList: async () => {
    return request("app/userAddress/list", {method: 'POST', data: {}});
  },

  getQuestionList: async (pinjiuId) => {
    return request("app/pinjiuMessage/listPage", {method: 'POST', data: {pinjiuId}});
  },
  addMessage: async (pinjiuId,question) => {
    return request("app/pinjiuMessage/addMessage", {method: 'POST', data: {pinjiuId,question}});
  },
}
