<template>
  <div class="shopsp">
      <div class="div1">


          <div class="left">
              <div v-for="(v,i) in data" :key="i" :class="{aa:index==i}" @click="aa(i)">
                {{v.name}}
              </div>
          </div>


          <div class="right">
              <div v-for="(v,i) in data" :key="i">
                <p :id="'title'+i">{{v.name}}</p>

                <div v-for="(item,key) in v.foods" :key="key">
                    <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
                    <div>
                        <p class="p1">{{item.name}}</p>
                        <p class="p2">{{item.description}}</p>
                        <p class="p3">月售{{item.month_sales}}份  好评率{{item.satisfy_rate}}%</p>
                        <span class="p4" v-if="item.activity!=null">{{item.activity.image_text}}</span>
                        <div class="p5">
                            <span><a>￥{{item.specfoods[0].price}}</a> 起</span>

                            <span v-show="item.specfoods.length==1">
                                <i class="el-icon-remove-outline" v-show="item.__v>0"  @click="item.__v--"></i>
                                <span v-show="item.__v>0">{{item.__v}}</span>
                                <i class="el-icon-circle-plus" @click="item.__v++,add(item)"></i>
                            </span>

                            <span v-show="item.specfoods.length>1">
                                <i class="el-icon-remove-outline" v-show="item.__v>0" @click="item.__v--"></i>
                                <span v-show="item.__v>0">1</span>
                                <span>选择规格</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>


      <div class="foot">
          <span class="xqq1" v-show="this.$store.getters.num>0">{{this.$store.getters.num}}</span>
          <div class="div1" @click="carthove" :class="{div1a:this.$store.getters.num>0}">
            <i class="el-icon-shopping-cart-2"></i>
          </div>
          <div class="div2">
              <p>￥{{this.$store.getters.num2}}.00</p>
              <p>配送费￥{{this.$store.state.sj.float_delivery_fee}}</p>
          </div>
          <div class="div3" :class="{div3a:this.$store.getters.num2>=this.$store.state.sj.float_minimum_order_amount}">
              <span v-show="this.$store.getters.num2<this.$store.state.sj.float_minimum_order_amount">还差￥{{this.$store.state.sj.float_minimum_order_amount}}起送</span>
              <span v-show="this.$store.getters.num2>=this.$store.state.sj.float_minimum_order_amount">去结算</span>
          </div>
            <!-- 购物车列表 -->
          <transition>
            <div class="div4" v-show="flag&&this.$store.getters.num">
                <p>
                    <span>购物车</span>
                    <span @click="del">清空</span>
                </p>
                <div v-for="(v,i) in this.$store.state.cart" :key="i" v-show="v.__v>0">
                    <span>{{v.name}}</span>
                    <span>
                        <span>￥{{v.specfoods[0].price}}</span>
                        <span>
                                <i class="el-icon-remove-outline" v-show="v.__v>0" @click="v.__v--"></i>
                                <span v-show="v.__v>0">{{v.__v}}</span>
                                <i class="el-icon-circle-plus" @click="v.__v++,add(v)"></i>
                        </span>
                    </span>
                </div>
            </div>
          </transition>

      </div>
  </div>
</template>

<script>
import {splb} from "@/components/api/getdata"
export default {
    name:"shopsp",
    data() {
        return {
            id:"",
            data:[],
            index:0,
            flag:false,
            num:0
        }
    },
    async mounted() {
        this.id = this.$route.query.id
        const res = await splb({restaurant_id:this.id})
        this.data = res.data
        console.log(res.data)
    },
    methods: {
        aa(i){
            this.index = i
            document.getElementById("title"+i).scrollIntoView({behavior:"smooth"})
        },
        add(item){
            this.$store.commit("addcart",item)
            console.log(item)
        },
        del(){
            this.$store.commit("del")
        },
        carthove(){
            if(this.$store.state.cart.length>0){
                this.flag=!this.flag
            }
            // console.log(this.flag)
        }
    },
}
</script>

<style lang="scss" scoped>
    .shopsp{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .div1{
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
    }
    
    .left{
        width: 1.8rem;
        height: 100%;
        background: #f5f5f5;
        overflow: auto;
        >div{
            height: 1.2rem;
            text-align: center;
            line-height: 1.2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 0 0.2rem;
        }
    }

    .right{
        width: 5.7rem;
        height: 100%;
        overflow: auto;
        >div{
            width: 100%;
            background: white;
            >p{
                width: 100%;
                height: 0.96rem;
                background: #f5f5f5;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 0 0.2rem;
            }
            >div{
                border-bottom: 1px solid #f2f2f2;
                display: flex;
                justify-content: space-between;
                >img{
                    width: 0.9rem;
                    height: 0.9rem;
                    margin: 0.2rem;
                    display: inline-block;
                }
                >div{
                    flex: 1;
                    // width: 90%;
                    >.p1{
                        color: #212121;
                        font-weight: bold;
                    }
                    >.p2{
                        color: #c2c2c2;
                        font-size: 0.25rem;
                        
                    }
                    >.p3{
                        color: #4a4a4a;
                        font-size: 0.25rem;
                    }
                    >.p4{
                        color: #f4a57a;
                        font-size: 0.1rem;
                        border-radius: 0.3rem;
                        border: 1px solid #f28888;
                        padding: 0 0.04rem;
                    }
                    >.p5{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 0.2rem;
                        >span:nth-child(1){
                            font-size: 0.25rem;
                            color: #767676;
                            >a{
                                color: #ff5900;
                                font-size: 0.3rem;
                            }
                        }
                        >span:nth-child(2){
                            >i:nth-child(1){
                                color: #3190e8;
                            }
                            >span{
                                width: 0.3rem;
                                display: inline-block;
                                font-size: 0.25rem;
                                color: #636363;
                                text-align: center;
                            }
                            >i:nth-child(3){
                                color: #3190e8;
                                margin-right: 0.2rem;
                            }
                        }
                        >span:nth-child(3){
                            >span{
                                font-size: 0.25rem;
                                color: #636363;
                            }
                            >span:nth-child(3){
                                font-size: 0.25rem;
                                display: inline-block;
                                color: #fff;
                                padding: .05rem .1rem;
                                background-color: #3190e8;
                                border-radius: .1rem;
                                border: 1px solid #3190e8;
                            }
                        }
                    }
                }
            }
        }
    }
    .aa{
        background: white;
        box-sizing: border-box;
        border-left: 4px solid #278ae7;
    }
    .foot{
        width: 100%;
        height: 0.92rem;
        background: #3d3d3f;
        position: relative;
        display: flex;
        >.xqq1{
            padding: 0 0.1rem;
            background: red;
            left: 40px;
            top: -22px;
            z-index: 10;
            position: absolute;
            color: white;
            border-radius: 50%;
            font-size: 0.25rem;
        }
        >.div1{
            width: 1rem;
            height: 1rem;
            position: absolute;
            left: 0.2rem;
            border: 4px solid #453f3b;
            border-radius: 50%;
            box-sizing: border-box;
            bottom: 0.2rem;
            background: #3d3d3f;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            >i{
                color: white;
                font-size: 0.6rem;
            }
        }
        >.div1a{
            background: #3190e8;
        }
        >.div2{
            width: 4rem;
            height: 100%;
            margin-left: 1.45rem;
            color: white;
            >p:nth-child(1){
                padding-top: 0.05rem;
                font-size: 0.35rem;
                font-weight: bold;
            }
            >p:nth-child(2){
                font-size: 0.2rem;
            }
        }
        >.div3{
            width: 2.3rem;
            background: #535356;
            float: right;
            color: white;
            font-weight: bold;
            text-align: center;
            line-height: 0.9rem;
        }
        >.div3a{
            background:#4cd964;
        }
        >.div4{
            position: absolute;
            background: white;
            width: 100%;
            bottom: 0.84rem;
            >p{
                height: 0.8rem;
                background: #eceff1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 0.2rem;
            }
            >div{
                box-sizing: border-box;
                padding: 0 0.2rem;
                height: 0.8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // >span:nth-child(1){
                   
                // }
                >span:nth-child(2){
                   >span:nth-child(1){
                        color: #f60;
                        padding-right: 0.4rem;
                   }
                   >span:nth-child(2){
                        color: #3190e8;
                        >span{
                            width: 0.4rem;
                            display: inline-block;
                            color: #333;
                            text-align: center;
                        }
                   }
                   
                }
            }
        }
    }
    // .v-enter,.v-leave-to{
    //     height: 0%;
    //     transition: all .1s;
    // }
    // .v-enter-to,.v-leave{
    //     height: 100%;
    //     transition: all .1s;
    // }
</style>