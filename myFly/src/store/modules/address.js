import QQMapWX from "../../utils/qqMap";
//原来数据
const state = {
  text: "",
  mks: [],
  obj: {}
};

//派生数据
const getters = {};

//异步改变
const actions = {
  goToInp({ commit }, e) {
    state.text = e.target.value;

    // 实例化API核心类
    const qqmapsdk = new QQMapWX({
      key: "X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
    });

    // 调用接口
    qqmapsdk.search({
      keyword: state.text, //搜索关键词
      location: "39.980014,116.313972", //设置周边搜索中心点
      success: function(res) {
        //搜索成功后的回调
        var mks = [];
        for (var i = 0; i < res.data.length; i++) {
          mks.push({
            // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/resources/my_marker.png", //图标路径
            width: 20,
            height: 20
          });
        }
        // console.log(mks);
      },
      fail: function(res) {
        // console.log(res);
      },
      complete: function(res) {
        commit("changeList", res.data);
      }
    });
  }
};

//同步改变
const mutations = {
  changeList(state, payload) {
    state.mks = payload;
  },
  goToAdd(state, payload) {
    state.obj = { ...payload };
    wx.navigateBack({
      url: "../addList/main"
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
