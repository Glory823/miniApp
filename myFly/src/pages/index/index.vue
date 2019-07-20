<template>
  <div class="wrap">
    <div class="wrapMap">
      <Map :reLocation="reLocation"/>
      <cover-image src="/static/images/logo.png" @tap="toPerson" class="img"/>
    </div>
    <button type="default" class="addBtn" @tap="addList">添加面试</button>
  </div>
</template>

<script>
import Map from "../../components/map";
import { getLocation, getAuth } from "../../utils/index.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      // 用户当前位置
      reLocation: false,
      markers: []
    };
  },

  components: {
    Map
  },

  methods: {
    // 去添加面试
    addList: () => {
      wx.navigateTo({
        url: "../addList/main"
      });
    },
    // 去个人中心
    toPerson: () => {
      wx.navigateTo({
        url: "../personal/main"
      });
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.wrapMap {
  width: 100%;
  flex: 1;
  .img {
    width: 40px;
    height: 40px;
    background: #000;
    border-radius: 50%;
    position: absolute;
    right: 20px;
    bottom: 80px;
    z-index: 99;
  }
}
.addBtn {
  width: 100%;
  border-radius: 0;
  background: #000;
  color: #fff;
}
</style>
