<template>
  <div class="shop">
      <div class="top">

          <div class="div1">
                <img :src="'http://elm.cangdu.org/img/'+data.image_path" alt="">
                <div>
                    <p>{{data.name}}</p>
                    <p>商家配送/分钟送达/配送费￥5</p>
                    <p>{{data.promotion_info}}</p>
                </div>
                <span class="el-icon-arrow-left"></span>
          </div>

          <div class="div2">
              <router-link :to="'/shop/shopsp?id='+id" tag="p">
                    <span>商品</span>
              </router-link>
              <router-link :to="'/shop/shoppj?id='+id" tag="p">
                    <span>评价</span>
              </router-link>
          </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import {cgxq} from "@/components/api/getdata"
export default {
    name:"shop",
    data(){
        return{
            data:{},
            id:""
        }
    },
    created() {
        
    },
    async mounted() {
        this.id = this.$route.query.id
        const res = await cgxq({},this.id)
        this.data = res.data
        console.log(res)
        this.$store.commit("addsj",res.data)
    },
}
</script>

<style lang="scss" scoped>
    .shop{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .top{
            width: 100%;
            height: 2.8rem;
            border-bottom: 1px solid #eeeeee;
        }
    }
    .div1{
        width: 100%;
        height: 1.8rem;
        display: flex;
        background: #b0b2c4;
        box-sizing: border-box;
        padding: 0.2rem;
        >img{
            height: 100%;
            margin-right: 0.2rem;
        }
        >div{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
            font-size: 0.25rem;
            >p:nth-child(1){
                font-size: 0.35rem;
                font-weight: bold;
            }
        }
        >span{
            position: absolute;
            color:white;
            font-size: 0.5rem;
            font-weight: bold;
            top: 0.02rem;
            left: -0.02rem;
        }
    }

    .div2{
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        >p{
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            >span{
                padding: 0.2rem 0;
                box-sizing: border-box;
            }
        }
    }
    .router-link-active{
        >span{
            color: #4ea0eb;
            border-bottom: 2px solid #4ea0eb;
        }
        
    }
</style>