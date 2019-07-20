import Vue from "vue";
import Vuex from "vuex"
import createLogger from "vuex/dist/logger"

//引入子模块
import index from "./modules/index"
import interview from "./modules/interviewList"
import address from "./modules/address"
import addList from "./modules/addList"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        index,
        interview,
        address,
        addList
    },
    plugins:[createLogger()]
})