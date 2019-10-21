<template>
  <div class="home">
    <Headers>
      <span slot="left">ele.me</span>
      <span slot="title"></span>
      <span slot="right">登陆|注册</span>
    </Headers>
    <div class="content">
        <!-- 定位城市 -->
      <div class="div1">
        <p>
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </p>

        <router-link :to="'/city/'+dycity.id" tag="p">
          <router-link :to="'/city/'+dycity.id" tag="span">{{dycity.name}}</router-link>
          <span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </router-link>
      </div>

        <!-- 热门城市 -->
      <div class="div2">
          <p>热门城市</p>
          <table>
              <router-link :to="'/city/'+v.id" tag="td" v-for="(v,i) in hotcity" :key="i" style="color:#3c95e9;">
                    {{v.name}}
                </router-link>
          </table>
      </div>

      <!-- 所有城市 -->
      <div class="div2" v-for="(v,i) in allcity" :key="i">
          <p>{{v}}  <span :v-if="i<1" style="color:#999999;font-size:0.22rem;">（按字母排序）</span></p>
          <table>
              <router-link :to="'/city/'+v.id" tag="td" v-for="(v,i) in allcity2[v]" :key="i">
                    {{v.name}}
                </router-link>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "./headers";
import { city } from "@/components/api/getdata";
export default {
  name: "home",
  components: { Headers },
  data() {
    return {
        dycity:"",
        hotcity:[],
        allcity:[],
        allcity2:[]
    };
  },
  async mounted() {
      //获取定位城市
    const res = await city({type:"guess"})
    this.dycity = res.data
    console.log(res.data)


    //获取热门城市
    const rm = await city({type:"hot"})
    this.hotcity = rm.data


    //获取所有城市
    const all = await city({type:"group"})
    console.log(all.data)
    this.allcity = Object.keys(all.data).sort()
    this.allcity2 = all.data
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content {
  flex: 1;
  overflow: auto;
  background: #f5f5f5;
}
.div1 {
  width: 100%;
  height: 1.65rem;
  margin-bottom: 0.2rem;
  background: white;
  > p {
    height: 50%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.2rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > p:nth-child(1) {
    font-size: 0.23rem;
    > span:nth-child(1) {
      color: #626262;
    }
    > span:nth-child(2) {
      color: #929292;
    }
  }
  > p:nth-child(2) {
    font-size: 0.35rem;
    > span:nth-child(1) {
      color: #3692e9;
    }
    > span:nth-child(2) {
      color: #868686;
      font-weight: bold;
    }
  }
}


.div2{
    width: 100%;
    margin-bottom: 0.2rem;
    background: white;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.25rem;
    color: #505050;
    >p{
        box-sizing: border-box;
        padding: 0.2rem;
        border-top:1px solid #e2e2e2;
    }
    >table{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        border-collapse: collapse;
        >td{
            font-size: 0.28rem;
            box-sizing: border-box;
            padding: 0.22rem 0.2rem;
            text-align: center;
            width: 25%;
            border-top: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>