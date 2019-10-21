<template>
  <div class="food">
<!-- 头部  头部  头部  头部  头部  头部  头部  头部  头部  头部  头部 -->
    <Headers>
      <span slot="left" style="font-size:0.5rem;">
        <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      </span>
      <span slot="title" style="font-size:0.4rem;">{{title}}</span>
      <span slot="right"></span>
    </Headers>
<!-- 筛选菜单  筛选菜单  筛选菜单  筛选菜单  筛选菜单  筛选菜单  筛选菜单  筛选菜单  筛选菜单 -->
    <div class="nav">
        <div class="nav2" v-for="(v,i) in nav" :key="i" @click="nava(v,i)" :class="i==index?'aa':''">
            {{v.name}}
            <i class="el-icon-caret-bottom"></i>
            <!-- :class="i==index?'el-icon-caret-top':'el-icon-caret-bottom'" -->
        </div>
    </div>
<!-- 阴影部分  阴影部分  阴影部分  阴影部分  阴影部分  阴影部分  阴影部分 -->
    <transition>
      <nav v-show="index!=-1">

          <div v-show="index==0" class="fl">
            <div class="left">
              <div v-for="(v,i) in navfl" :key="i" :class="{bb:index2==i}" @click="index2=i">
                  <span>{{v.name}}</span>
                  <span><a>{{v.count}}</a> <i class="el-icon-arrow-right"></i> </span>
              </div>
            </div>
            <div class="right">
              <div v-for="(v,i) in navfl[index2].sub_categories" :key="i" v-show="i>0" @click="fl(v.id,v.name)">
                    <span>{{v.name}}</span>
                    <span>{{v.count}}</span>
              </div>
            </div>
          </div>

          <div v-show="index==1" class="px">
              <div v-for="(v,i) in px" :key="i" @click="index2=i;add(v.type,v.flag)">
                <i :class="v.iclass" :style="{color:v.color}"></i>
                <p :class="{pp:index2==i}">
                  {{v.name}}
                  <i class="el-icon-check" v-show="index2==i"></i>
                </p>
              </div>
          </div>
          <div v-show="index==2" class="sx">
            <div class="top">
                <p>配送方式</p>
                <div>蜂鸟专送</div>
                <p>商家属性(可以多选)</p>
            </div>
            
          </div>
      </nav>
    </transition>

<!-- 商品列表  商品列表  商品列表  商品列表  商品列表  商品列表 -->
    <div class="content">
      <router-link :to="'/shop/shopsp?id='+v.id" tag="div" v-for="(v,i) in fj" :key="i">
        <img :src="'http://elm.cangdu.org/img/'+v.image_path" alt />
        <div>
          <p>
            <span v-show="v.is_premium">品牌</span>
            {{v.name}}
          </p>
          <div>
             <el-rate
                v-model="v.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            <span>
              月售{{v.recent_order_num}}单
              </span>
          </div>
          <p>{{"￥"+v.float_minimum_order_amount}}起送 / {{v.piecewise_agent_fee.tips}}</p>
        </div>
        <div>
          <p>保 准 票</p>
          <p>
            <span>{{v.delivery_mode.text}}</span>
            <span>准时达</span>
          </p>
          <p>
            <span>{{v.distance}}/</span>
            <span style="color:#0074e2;">{{v.order_lead_time}}</span>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Headers from "./headers";
import { spflsp , navfl ,xxspfl} from "./api/getdata";
export default {
  name: "food",
  components: { Headers },
  data() {
    return {
      title: "",
      geohash: "",
      fj:[],
      index:-1,
      index2:1,
      nav:[
          {name:"",flag:true},
          {name:"排序",flag:true},
          {name:"筛选",flag:true},
      ],
      navfl:[],
      px:[
        {name:"智能排序",iclass:"el-icon-sort",color:"#1b73bf",type:"",flag:1},
        {name:"距离最近",iclass:"el-icon-location-outline",color:"#1b93cf",type:"distance",flag:0},
        {name:"销量最高",iclass:"el-icon-pear",color:"#f17979",type:"recent_order_num",flag:1},
        {name:"起送价最低",iclass:"el-icon-ice-cream",color:"#f17979",type:"float_minimum_order_amount",flag:0},
        {name:"配送速度最快",iclass:"el-icon-time",color:"#62d3c5",type:"order_lead_time",flag:0},
        {name:"评分最高",iclass:"el-icon-star-off",color:"#eba943",type:"rating",flag:1},
      ]
    };
  },
  async created() {
    this.geohash = this.$route.query.geohash;
    this.title = this.$route.query.title;
    //获取头
    // console.log(this.title);

    //获取商品
    const res = await spflsp({
      latitude: this.$store.state.city.latitude,
      longitude: this.$store.state.city.longitude
    });
    this.fj = res.data
    // console.log(res.data);

    //获取nav分类
    const nav = await navfl({
      latitude: this.$store.state.city.latitude,
      longitude: this.$store.state.city.longitude
    })
    // console.log(nav.data)
    this.navfl = nav.data
  },
  mounted() {
      this.nav[0].name = this.title
  },
  methods: {
      nava(v,i){
        this.index==i?this.index=-1:this.index = i

         if(this.index==0){
           v.name = "分类"
         }else{
           this.nav[0].name = this.title
         }
      },
      add(type,flag){
        console.log(type)
        if(flag==1){
          //大到小
          function compare(v){
            return function(a,b){
              var value1 = parseInt(a[v]);
              var value2 = parseInt(b[v]);
              return value2-value1
            }
          }
          this.fj = this.fj.sort(compare(type))
        }else{
          function compare(v){
            return function(a,b){
              var value1 = parseInt(a[v]);
              var value2 = parseInt(b[v]);
              return value1-value2
            }
          }
          this.fj = this.fj.sort(compare(type))
        }
        this.index = -1;
      },
      async fl(id,name){
        this.title = name
        const res = await xxspfl({
          latitude: this.$store.state.city.latitude,
          longitude: this.$store.state.city.longitude,
          offset:0,
          limit:20,
          "extras[]":"activities",
          "restaurant_category_ids[]":id
        })
        console.log(res.data)
        this.fj =res.data
        this.index = -1;
      }
  },
};
</script>

<style lang="scss" scoped>
.food{
    width: 100%;
    height: 100%;
}
.nav {
  width: 100%;
  height: 0.8rem;
  background: white;
  border-bottom: 0.025rem solid #f1f1f1;
  display: flex;
  color: #333;
  font-size: 0.25rem;
  position: fixed;
  top: 0.95rem;
  right: 0;
  width: 100%;
  z-index: 89;
  .nav2{
      width: 33.33%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      >i{
        transform-origin:center center;
        transform: rotate(0deg);
        transition: all .3s;
      }
  }
  >.aa{
    color: #258be6;
    i{
        transform-origin:center center;
        transform: rotate(180deg);
        transition: all .3s;
      }
  }
}
.headers{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
}
.content {
    width: 100%;
    padding-top:1.75rem;
  > div {
    box-sizing: border-box;
    padding: 0.35rem 0.2rem;
    display: flex;
    border-bottom: 1px solid #fafafa;

    // 第一个
    > img {
      height: 1.2rem;
      widows: 1.2rem;
      margin-right: 0.2rem;
    }
    // 第二个
    > div:nth-child(2) {
      width: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > p:nth-child(1) {
        font-size: 0.28rem;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > span {
          background: #ffdc30;
          border-radius: 2px;
          font-size: 0.24rem;
          padding: 0.01rem 0.05rem;
        }
      }
      > div:nth-child(2) {
        font-size: 0.18rem;
        color: #b1b1b1;
        display: flex;
        align-items: center;
        >div{
           display: flex;
          align-items: center;
          margin-right: 0.1rem;
        }
        .el-rate__item {
          width: 0.2rem;
          > i {
            font-size: 0.1rem;
          }
        }
        .el-rate__text {
          font-size: 0.1rem;
        }
      }
      > p:nth-child(3) {
        font-size: 0.2rem;
        color: #585858;
      }
    }
    //第三个
    > div:nth-child(3) {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      font-size: 0.22rem;
      color: #8d8d8d;
      > p:nth-child(2) {
        font-size: 0.12rem;
        > span:nth-child(1) {
          color: white;
          background: #258be6;
          border: 0.01rem solid #258be6;
          padding: 0.01rem 0.05rem;
          border-radius: 2px;
        }
        > span:nth-child(2) {
          color: #258be6;
          background: white;
          border: 0.01rem solid #258be6;
          padding: 0.01rem 0.05rem;
          border-radius: 2px;
        }
      }
    }
  }
}
.nav1{
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0px;
  z-index: 3;
}
//阴影
nav{
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  padding-top:1.75rem;
  z-index: 88;
}
//阴影里面的三个盒子
    //分类 分类 分类 分类 分类 分类 分类
    .fl{
      width: 100%;
      height: 7.5rem;
      background: white;
      display: flex;
      >.left{
        width: 50%;
        height: 100%;
        overflow: auto;
        background: #f1f1f1;
        color: #545454;
        >div{
          width: 100%;
          height: 0.8rem;
          box-sizing: border-box;
          padding: 0 0.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.25rem;
          >span:nth-child(2){
            >a{
              background: #cccccc;
              color: #f9f9f9;
              padding: 0rem 0.1rem;
              border-radius: .8rem;
              font-size: 0.2rem;
            }
          }
        }
        >.bb{
          background: white;
        }
      }
      >.right{
        width: 50%;
        height: 100%;
        overflow: auto;
        color: #6b6b6b;
        font-size: 0.25rem;
        box-sizing: border-box;
        padding: 0 0.2rem;
        >div{
          width: 100%;
          height: 0.8rem;
          background: white;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    // 排序  排序  排序  排序  排序  排序  排序
    .px{
      width: 100%;
      position: relative;
      z-index: 10;
      background: white;
      >div{
        width: 100%;
        height: 1.1rem;
        display: flex;
        align-items: center;
        >i{
          padding: 0 0.4rem;
        }
        >.pp{
            color: #3291e8;
        }
        >p{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f2f2f2;
          font-size: 0.25rem;
          color: #777777;
          padding-right: 0.2rem;
          >i{
            font-size: 0.35rem;
            font-weight: bold;
          }
        }
      }
    }

    //赛选  赛选  赛选  赛选  赛选  赛选  赛选
    .sx{
       width: 100%;
       background: #f1f1f1;
       .top{
         box-sizing: border-box;
         padding:0 0.2rem;
         background: white;
         >p{
           padding: 0.2rem 0;
           font-size: 0.22rem;
           color: #636363;
         }
       }
    }
// 阴影动画
.v-enter,.v-leave-to{
  height: 0%;
  transition: all .2s;
}
.v-enter-to,.v-leave{
  height: 100%;
  transition: all .5s;
}
</style>
<style lang="scss">
.el-rate__item {
width: 0.2rem;
> i {
font-size: 0.25rem;
}
}
.el-rate__text {
font-size: 0.25rem;
padding: 0 0.1rem;
}
</style>