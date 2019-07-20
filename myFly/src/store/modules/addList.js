import { addView } from "../../service/addList";
//原来数据
const state = {
  res: {}
};

//派生数据
const getters = {};

//异步改变
const actions = {
  async btnClick({ commit }, payload) {
    const res = await addView(payload);
    return res;
  }
};

//同步改变
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
