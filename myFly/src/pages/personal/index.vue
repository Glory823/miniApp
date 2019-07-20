<template>
  <div class="main">
    <div class="mainTop">
      <p>
        <cover-image src="/static/images/logo.png" class="topImg"/>
      </p>
      <span>{{phoneNumber}}</span>
    </div>
    <ul>
      <li @click="goToAdd">
        <p>
          <icon type="waiting" class="_icon"></icon>
          <label class="_label">我的面试</label>
        </p>
        <cover-image src="/static/images/arrow.svg" class="addimg"/>
      </li>
      <li @click="showDialog">
        <p>
          <icon type="info" class="_icon"></icon>
          <label class="_label">客服中心</label>
        </p>
        <cover-image src="/static/images/arrow.svg" class="addimg"/>
      </li>
    </ul>
    <button v-if="showSetting" open-type="openSetting">设置</button>
    <div class="dialog" v-if="flag">
      <div class="mask">
        <p>为了更好地使用我们的服务,我们需要获取你的手机号码</p>
        <button v-if="!hasPhone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意</button>
      </div>
    </div>
  </div>
</template>

<script>
import { encrypteData } from "../../service/index";

export default {
  data() {
    return {
      hasPhone: false,
      showSetting: false,
      phoneNumber: "",
      flag: true
    };
  },

  components: {},

  computed: {},

  methods: {
    goToAdd() {
      wx.navigateTo({
        url: "../interviewList/main"
      });
    },
    showDialog() {
      wx.showModal({
        title: "模拟进入客服会话",
        content: "开发者工具暂不支持打开客服会话,请使用真机调试",
        showCancel: false,
        confirmText: "返回",
        confirmColor: "#19bf27"
      });
    },
    async getPhoneNumber(e) {
      if (e.target.errMsg != "getPhoneNumber:fail user deny") {
        //1.2.1获取授权成功
        let data = await encrypteData({
          encryptedData: e.target.encryptedData,
          iv: e.target.iv
        });
        if (data.code === 0) {
          this.flag = false;
          wx.showToast({
            title: "绑定手机号成功", //提示的内容,
            icon: "success" //图标,
          });
        }
        // console.log(data);
        this.phoneNumber = this.replaces(data.data.phoneNumber, 2, 6, "****");
      } else {
        //1.2.2用户授权失败,打开设置页面
        this.flag = false;
        this.showSetting = true;
      }
    },
    replaces(str, start, end, replaceStr) {
      return str.substring(0, end - 3) + replaceStr + str.substring(end + 1);
    }
  },

  created() {
    let that = this;
    //1. 获取用户授权
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 1.1用户已经授权
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              //1.1.1调用api获取用户信息
              that.hasPhone = true;
              // console.log("userInfor...", res);
            }
          });
        } else {
          // 1.2用户没有授权
          that.hasPhone = false;
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  .mainTop {
    width: 100%;
    height: 200px;
    background: #f4f6f9;
    padding: 25px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p {
      width: 70px;
      height: 70px;
      padding: 15px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 50%;
      line-height: 70px;
      margin: 0 auto;
      .topImg {
        width: 100%;
        height: 100%;
      }
    }
  }
  ul {
    width: 100%;
    height: auto;
    li {
      width: 100%;
      padding: 15px 25px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      font-size: 17px;
      p {
        flex: 1;
        display: flex;
        align-items: center;
        label {
          margin-left: 20px;
          color: #666;
        }
      }
      .addimg {
        width: 20px;
        height: 20px;
      }
    }
  }
  button {
    width: 100%;
    height: 60px;
    margin-top: 30px;
    background: #197dbf;
    color: #fff;
    border-radius: 0;
    border: 0;
    outline: none;
  }
}
.dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  .mask {
    width: 250px;
    height: 100px;
    border-radius: 8px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
      padding: 12px 5px;
      box-sizing: border-box;
      font-size: 16px;
    }
    button {
      margin-top: 0;
    }
  }
}
</style>
