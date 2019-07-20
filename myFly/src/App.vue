<script>
import { login } from "./service/index";

export default {
  created() {
   
    //登录
    wx.login({
      async success(res) {
        if (res.code) {
          //发起网络请求
          let data = await login(res.code);
          wx.setStorageSync("openid", data.data.openid);
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  },
  log() {
    console.log(`log at:${Date.now()}`);
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
html{
  width: 100%;
  height: 100%;
}
</style>
