<template>
  <div class="add_address">
    <header>
      <span>北京</span>
      <input type="text" placeholder="面试地址" v-model="text" @input="goToInp">
    </header>
    <ul>
      <li v-for="(item,index) in mks" :key="index" @click="goToAdd(item)">
        <div class="li_left">
          <cover-image src="/static/images/address.svg"/>
        </div>
        <div class="li_right">
          <h3>{{item.title}}</h3>
          <p>{{item.address}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      text: state => state.address.text,
      mks: state => state.address.mks
    })
  },
  methods: {
    ...mapActions({
      goToInp: "address/goToInp"
    }),
    ...mapMutations({
      goToAdd: "address/goToAdd"
    })
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.add_address {
  width: 100%;
}
header {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  span {
    width: 26%;
    text-align: center;
    box-sizing: border-box;
    border-right: 1px solid #eee;
  }
  input {
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
  }
}
ul {
  width: 100%;
  li {
    width: 100%;
    height: 50px;
    padding: 6px 0 6px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    .li_left {
      width: 50px;
      height: 50px;
      padding: 12px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li_right {
      flex: 1;
      margin-left: 5px;
      h3 {
        font-size: 17px;
      }
      p {
        font-size: 12px;
        color: silver;
        width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
