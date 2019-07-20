<template>
  <div class="main">
    <form @submit="formSubmit" report-submit="true">
      <h3>面试信息</h3>
      <div class="mainInp">
        <p>
          <span>公司名称</span>
          <input type="text" placeholder="请输入公司名称" name="componentName">
        </p>
        <p>
          <span>公司电话</span>
          <input type="text" placeholder="请输入面试联系人电话" name="componentTel">
        </p>
        <p>
          <span>面试时间</span>
          <picker
            mode="multiSelector"
            :range="dateRange"
            :value="info.date"
            @change="dateChange"
            @columnchange="columnChange"
          >
            <view class="picker">{{dateShow}}</view>
          </picker>
        </p>
        <p>
          <span>面试地址</span>
          <input
            type="text"
            placeholder="请选择面试地址"
            @click="geToAddress"
            :value="obj.address"
            name="viewAddress"
          >
        </p>
      </div>
      <h3>备注信息</h3>
      <div class="mainText">
        <textarea id cols="20" rows="10" placeholder="备注信息(可选，100个字以内)" name="textArea"></textarea>
      </div>
      <button form-type="submit">确定</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const moment = require("moment");

const days = [];
const hours = [];
const minutes = [];
const range = [];

function addZero(text) {
  return text < 10 ? "0" + text : text;
}

for (let i = 0; i <= 9; i++) {
  days.push(addZero(i));
}
range.push(days);
for (let i = 0; i <= 23; i++) {
  hours.push(addZero(i));
}
range.push(hours);
for (let i = 0; i < 60; i += 10) {
  minutes.push(addZero(i) + "分");
}
range.push(minutes);

export default {
  data() {
    return {
      info: {
        date: [0, 0, 0]
      }
    };
  },
  created() {
    // 如果当前时间是十一点之后，过滤掉今天 -- moment().hour() -> 获取当前小时
    if (moment().hour() == 23) {
      this.info.date = [1, 0, 0];
    }
  },

  components: {},

  computed: {
    ...mapState({
      obj: state => state.address.obj
    }),
    // 处理面试日期
    dateRange() {
      let dateRange = [...range];
      // 如果时间是今天，过滤掉现在之前的小时
      if (!this.info.date[0]) {
        dateRange[1] = dateRange[1].filter(item => {
          return item > moment().hour();
        });
      } else {
        dateRange[1] = range[1];
      }
      // 格式化小时
      dateRange[1] = dateRange[1].map(item => {
        return item + "点";
      });
      // 计算当前日期之后的十天
      dateRange[0] = dateRange[0].map(item => {
        return (
          moment()
            .add(item, "days")
            .date() + "号"
        );
      });
      return dateRange;
    },
    // 显示的日期
    dateShow() {
      return moment()
        .add(
          moment().hour() == 23 ? this.info.date[0] - 1 : this.info.date[0],
          "d"
        )
        .add(this.info.date[1] + 1, "h")
        .minute(this.info.date[2] * 10)
        .format("YYYY-MM-DD HH:mm");
    }
  },

  methods: {
    ...mapActions({
      btnClick: "addList/btnClick"
    }),
    // 监听多列选择器每列变化
    columnChange(e) {
      let { column, value } = e.target;
      let date = [...this.info.date];
      date[column] = value;
      this.info.date = date;
    },
    //点击确定按钮
    formSubmit: async function(e) {
      const detail = e.mp.detail;

      //判断公司名称
      if (detail.value.componentName === "") {
        wx.showToast({
          title: "请输入公司名称", //提示的内容,
          icon: "none" //图标,
        });
        return false;
      }
      //判断手机号
      if (!/^1[3578]\d{9}$/.test(detail.value.componentTel)) {
        wx.showToast({
          title: "请输入面试联系人的手机", //提示的内容,
          icon: "none" //图标,
        });
        return false;
      }
      // 判断公司地址
      if (!this.obj.address) {
        wx.showToast({
          title: "请选择公司地址", //提示的内容,
          icon: "none" //图标,
        });
        return false;
      }
      //调用添加面试
      const res = await this.btnClick({
        company: detail.value.componentName,
        phone: detail.value.componentTel,
        form_id: detail.formId,
        address: JSON.stringify(this.obj),
        latitude: this.obj.location.lat,
        longitude: this.obj.location.lng,
        start_time: +new Date(this.dateShow),
        description: detail.value.textArea
      });
      // console.log(res);

      if (res.code === 0) {
        //添加面试成功
        wx.showModal({
          title: "温馨提示",
          content: "添加面试成功",
          showCancel: false,
          success(res) {
            wx.navigateTo({
              url: "../interviewList/main"
            });
          }
        });
      } else {
        //添加面试失败
        wx.showModal({
          title: "温馨提示",
          content: res.msg
        });
      }
    },
    //添加面试地址
    geToAddress: () => {
      wx.navigateTo({
        url: "../address/main"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  font-size: 17px;
  h3 {
    width: 100%;
    height: 42px;
    background: #f6f6f6;
    padding-left: 15px;
    box-sizing: border-box;
    line-height: 42px;
  }
  .mainInp {
    background: #fff;
    width: 100%;
    p {
      width: 100%;
      height: 45px;
      border-bottom: 1px solid #eee;
      margin-left: 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      span {
        color: #666;
        padding-right: 35px;
        box-sizing: border-box;
      }
      input {
        color: #333;
        flex: 1;
        padding-right: 20px;
        box-sizing: border-box;
      }
      picker {
        flex: 1;
        padding-right: 20px;
        box-sizing: border-box;
      }
    }
  }
  .mainText {
    width: 100%;
    height: auto;
    textarea {
      height: 100px;
      border: 1px solid silver;
      padding: 10px;
      box-sizing: border-box;
      margin: 15px;
      color: #333;
      font-size: 15px;
    }
  }
  button {
    margin-top: 25px;
    background: #999;
    color: #fff;
    border-radius: 0;
  }
}
</style>
