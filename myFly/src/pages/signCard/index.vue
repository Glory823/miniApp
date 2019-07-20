<template>
  <div class="wrap">
    <div class="wrapMap">
      <Map :markers="markers" :updateDistance="updateDistance"/>
      <p>
        <cover-image src="/static/images/location.png" class="img"/>
      </p>
    </div>
    <button type="default" class="addBtn" @tap="goSign">打卡</button>
  </div>
</template>

<script>
import Map from "../../components/map";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      distance: 0
    };
  },

  components: {
    Map
  },
  computed: {
    ...mapState({
      obj: state => state.interview.obj,
      id: state => state.interview.id
    }),
    //重新计算距离
    distance() {
      return getDistance(this.obj.latitude, this.obj.longitude);
    },
    markers() {
      if (this.obj && Object.keys(this.obj)) {
        return [
          {
            iconPath: "/static/images/arrave.jpg",
            latitude: this.obj.latitude,
            longitude: this.obj.longitude,
            title: this.obj.company,
            width: 20,
            height: 20
          }
        ];
      } else {
        return [];
      }
    }
  },
  methods: {
    ...mapActions({
      updatedList: "interview/updatedList"
    }),
    updateDistance(distance) {
      // console.log("distance...", distance);
      this.distance = distance;
    },
    async goSign() {
      let distance = this.distance;
      if (this.distance < 100) {
        let result = await this.updatedList({
          id: this.id,
          params: {
            status: 0,
            sign_time: +new Date()
          }
        });
        // console.log("result...", result);
        wx.showToast({
          title: "打卡成功", //提示的内容,
          icon: "none" //图标,
        });
      } else {
        if (this.distance > 1000) {
          distance = (this.distance / 1000).toFixed(2) + "公里";
        } else {
          distance = this.distance.toFixed(2) + "米";
        }
        // console.log("distance...", distance, this.distance);
        wx.showToast({
          title: `你距目的地还有${distance},暂时还不能打卡`, //提示的内容
          icon: "none"
        });
      }
    }
  },

  created() {},
  onShow() {
    wx.setNavigationBarTitle({
      title: "打卡:" + this.obj.company
    });
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.wrapMap {
  width: 100%;
  flex: 1;
  p {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 80px;
    z-index: 99;
    .img {
      width: 40px;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.addBtn {
  width: 100%;
  border-radius: 0;
  background: #000;
  color: #fff;
}
</style>
