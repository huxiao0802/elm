<template>
  <div class="msite">
      <router-view></router-view>
      <div class="foot">
          <router-link :to="'/msite/ahome?geohash='+this.$store.state.city.geohash" tag="div">
              <i class="el-icon-eleme"></i>外卖
          </router-link>

          <router-link :to="'/msite/search/'+this.$store.state.city.geohash" tag="div">
              <i class="el-icon-discover"></i>搜索
          </router-link>
          <router-link to="/msite/ahome3" tag="div">
               <i class="el-icon-s-order"></i>订单
          </router-link>
          <router-link to="/msite/ahome4" tag="div">
              <i class="el-icon-user"></i>我的
          </router-link>
      </div>
  </div>
</template>
<script>
export default {
    name:"msite",
    data() {
        return {
            data:{},
        }
    },
}
</script>

<style lang="scss" scoped>
    .msite{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #f5f5f5;
    }
    .foot{
        width: 100%;
        height: 0.9rem;
        background: #ffffff;
        border-top: 1px solid #f3f3f3;
        display: flex;
        >div{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 0.22rem;
            color: #595959;
            >i{
                font-size: 0.5rem;
            }
        }
    }
    .router-link-active{
        >i{
            color: #0396ff;
        }
    }
</style>