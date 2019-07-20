import {
  interview,
  interviewDetail,
  updateList
} from "../../service/interviewList";

//原来数据
const state = {
  tabList: [
    {
      title: "未开始",
      status: -1
    },
    {
      title: "已打卡",
      status: 0
    },
    {
      title: "已放弃",
      status: 1
    },
    {
      title: "全部",
      status: 2
    }
  ],
  ind: 0,
  renderList: [],
  obj: {},
  id: 0
};

//派生数据
const getters = {};

//异步改变
const actions = {
  //获取面试列表
  async getData({ state }, params) {
    const res = await interview(params);
    res.data.map(item => {
      item.address = JSON.parse(item.address);
      item.start_time = new Date(Number(item.start_time)).toLocaleString();
    });
    if (params.page === 1) {
      state.renderList = res.data;
    } else {
      state.renderList = [...state.renderList, ...res.data];
    }
  },
  // 更新面试状态
  updatedList({ commit, dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      let data = await updateList(payload.id, payload.params);
      if (data.code == 0) {
        // 重新获取详情
        dispatch("getData", payload.id);
      }
      resolve(data);
    });
  },
  //跳转页面详情
  async gotoDetail({ commit }, id) {
    const result = await interviewDetail(id);
    commit("change", result.data);
    return result;
  }
};

//同步改变
const mutations = {
  change(state, res) {
    state.obj = { ...state.obj, ...res };
    state.id = res.id;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
