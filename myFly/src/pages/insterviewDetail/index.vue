<template>
  <div class="detail">
    <form @submit="formSubmit" report-submit="true">
      <p>
        <span>面试地址:</span>
        <input type="text" :value="address">
      </p>
      <p>
        <span>面试时间:</span>
        <input type="text" :value="time">
      </p>
      <p>
        <span>联系方式:</span>
        <input type="text" :value="obj.phone">
      </p>
      <p>
        <span>是否提醒:</span>
        <input type="text" :value="obj.remind === -1 ? '未提醒' : '已提醒'">
      </p>
      <p>
        <span>面试状态:</span>
        <input type="text" :value="status">
      </p>
      <p v-if="obj.status === -1">
        <span>取消提醒:</span>
        <switch name="switch" :checked="obj.remind===1" @change="cancelRemind"/>
      </p>
      <div class="btnDiv" v-if="obj.status === -1">
        <button @tap="goToCard">去打卡</button>
        <button @tap="giveup">放弃面试</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      obj: state => state.interview.obj,
      id: state => state.interview.id
    }),
    address() {
      return JSON.parse(this.obj.address).address;
    },
    time() {
      return new Date(Number(this.obj.start_time)).toLocaleString();
    },
    status() {
      let str = "";
      if (this.obj.status === -1) {
        str = "未开始";
      } else if (this.obj.status === 1) {
        str = "已放弃";
      } else {
        str = "已打卡";
      }
      return str;
    }
  },
  methods: {
    ...mapActions({
      updatedList: "interview/updatedList"
    }),
    goToCard() {
      wx.navigateTo({
        url: "../signCard/main"
      });
    },
    //取消提醒
    async cancelRemind(e) {
      let data = await this.updatedList({
        id: this.id,
        params: { remind: e.target.value ? 1 : -1 }
      });
      if (data.code === 0) {
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 3000
        });
      }
    },
    //放弃面试
    giveup() {
      wx.showModal({
        title: "温馨提示", //提示的标题,
        content: "确定要放弃面试吗?", //提示的内容,
        success: async res => {
          if (res.confirm) {
            let data = await this.updatedList({
              id: this.id,
              params: { status: 1 }
            });
            if (data.code === 0) {
              wx.showToast({
                title: "成功",
                icon: "success",
                duration: 3000
              });
            }
          }
        }
      });
    }
  },
  created() {},
  mounted() {},
  onShow() {
    wx.setNavigationBarTitle({
      title: this.obj.company
    });
  }
};
</script>
<style lang="scss" scoped>
p:first-child {
  border-top: 1px solid #eee;
  margin-left: 0;
  padding-left: 15px;
}
p {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #eee;
  margin-left: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 15px;
  span {
    color: #666;
    padding-right: 30px;
    box-sizing: border-box;
  }
  input {
    color: #333;
    flex: 1;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
p:last-child {
  border-bottom: 1px solid #eee;
  margin-left: 0;
  padding-left: 15px;
}
.btnDiv {
  margin: 25px 8px;
  display: flex;
  button {
    background: #197dbf;
    flex: 1;
    color: #fff;
    margin: 8px;
    border: none;
    outline: none;
    border-radius: 0;
  }
  button:last-child {
    background: #dc4e42;
  }
}
</style>
