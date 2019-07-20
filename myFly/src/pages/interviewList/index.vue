<template>
  <div class="listMain">
    <ul class="listHeader">
      <li
        v-for="(item,index) in tabList"
        :key="index"
        :class="{active:index==ind}"
        @tap="liClick({index,status:item.status})"
      >{{item.title}}</li>
    </ul>
    <div class="main">
      <div v-if="renderList.length>0">
        <dl v-for="(item,index) in renderList" :key="index" @tap="gotoDetails(item.id)">
          <dt>
            <h3>{{item.company}}</h3>
            <span :class="{blue:item.status===0,red:item.status===1}">{{status}}</span>
          </dt>
          <p>{{item.address.address }}</p>
          <dd>
            <h2>面试时间:{{item.start_time}}</h2>
            <span :class="{gray:item.status === 1}">{{item.remind === -1 ? "未提醒" : "已提醒"}}</span>
          </dd>
        </dl>
      </div>
      <div class="mainText" v-else>当前分类还没有面试!</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      ind: 0,
      page: 1,
      pageSize: 6,
      gotoStatus: -1
    };
  },
  computed: {
    ...mapState({
      tabList: state => state.interview.tabList,
      renderList: state => state.interview.renderList
    }),
    status() {
      let str = "";
      this.renderList.forEach(item => {
        if (item.status === -1) {
          str = "未开始";
        } else if (item.status === 1) {
          str = "已放弃";
        } else {
          str = "已打卡";
        }
      });
      return str;
    }
  },
  methods: {
    ...mapActions({
      getData: "interview/getData",
      gotoDetail: "interview/gotoDetail"
    }),
    //跳转详情
    async gotoDetails(id) {
      let data = await this.gotoDetail(id);
      // console.log(data);
      if (data.code === 0) {
        wx.navigateTo({
          url: "../insterviewDetail/main"
        });
      }
    },
    //tab切换
    liClick(payload) {
      this.page = 1;
      this.gotoStatus = payload.status;
      this.ind = payload.index;
      this.getData({
        status: payload.status,
        page: this.page,
        pageSize: this.pageSize
      });
    }
  },
  //刚进来页面的显示
  onShow() {
    this.getData({ status: -1, page: this.page, pageSize: this.pageSize });
  },
  mounted() {},
  //上拉加载数据
  onReachBottom() {
    if (this.page > this.renderList.length / this.pageSize) {
      wx.showToast({
        title: "没有更多数据了", //提示的内容,
        icon: "none" //图标,
      });
    } else {
      this.page = this.page + 1;
      this.getData({
        status: this.gotoStatus,
        page: this.page,
        pageSize: this.pageSize
      });
    }
    // console.log(this.page, "....", this.renderList);
  }
};
</script>
<style lang="scss" scoped>
.listMain {
  width: 100%;
}
.listHeader {
  width: 100%;
  height: 44px;
  line-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #eee;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  li.active {
    border-bottom: 1px solid #197dbf;
    color: #197dbf;
    font-weight: bold;
  }
}
.main {
  width: 100%;
  padding-top: 44px;
  dl {
    border-top: 20rpx solid #eee;
    width: 100%;
    height: 120px;
    padding: 5px 15px;
    box-sizing: border-box;
    dt,
    dd {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    dt {
      margin: 7px 0;
      h3 {
        font-size: 20px;
      }
      span {
        background: hsla(220, 4%, 58%, 0.1);
        border-color: hsla(220, 4%, 58%, 0.2);
        color: #909399;
        font-size: 16px;
        padding: 5px 7px;
        box-sizing: border-box;
      }
    }
    & > p {
      width: 300px;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      color: #999;
      margin: 7px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    dd {
      margin: 7px 0;
      font-size: 18px;
      span {
        background-color: hsla(0, 87%, 69%, 0.1);
        border-color: hsla(0, 87%, 69%, 0.2);
        color: #f56c6c;
        padding: 5px 7px;
        box-sizing: border-box;
      }
      h2 {
        font-size: 17px;
      }
    }
    span.gray {
      background: hsla(220, 4%, 58%, 0.1);
      border-color: hsla(220, 4%, 58%, 0.2);
      color: #909399;
    }
    span.red {
      background-color: hsla(0, 87%, 69%, 0.1);
      border-color: hsla(0, 87%, 69%, 0.2);
      color: #f56c6c;
    }
    span.blue {
      border-color: hsla(0, 87%, 69%, 0.2);
      background: rgba(64, 158, 255, 0.1);
      color: #409eff;
    }
  }
  & > p {
    text-align: center;
    font-size: 32rpx;
    line-height: 2;
    color: #999;
    border-top: 20rpx solid #eee;
  }
}
.mainText {
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 50px 0;
  box-sizing: border-box;
}
</style>
