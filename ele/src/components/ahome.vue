<template>
  <div class="ahome">
    <Headers>
      <span slot="left"  style="font-size:0.4rem;">
        <router-link :to="'/msite/search/'+this.$store.state.city.geohash" tag="i" class="el-icon-search">
                   
        </router-link>
      </span>
      <span slot="title" style="font-size:0.35rem;">{{this.$store.state.city.name}}</span>
      <span slot="right" style="font-size:0.28rem;">登陆|注册</span>
    </Headers>
    <div class="content">

      <!-- 食品分类 -->
      <div id="lunbo1">
        <swiper :options="swiperOption">
          <!-- <router-link tag="swiper-slide">

          </router-link> -->
          <router-link tag="div" :to="'/food?title='+v.title+'&geohash='+geohash" v-for="(v,i) in list" :key="i" class="swiper-slide">
            <img :src="'https://fuss10.elemecdn.com'+v.image_url" alt />
            <span>{{v.title}}</span>
          </router-link>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <!-- 附近商家 -->

      <div class="fjsj">
        <p>
          <i class="el-icon-s-shop"></i>
          <span>附近商家</span>
        </p>
        <router-link :to="'/shop/shopsp?id='+v.id" tag="div" v-for="(v,i) in fj" :key="i">
          <img :src="'http://elm.cangdu.org/img/'+v.image_path" alt />
          <div>
            <p>
                <span v-show="v.is_premium">品牌</span>
                {{v.name}}
            </p>
            <div>
              <span>月售{{v.recent_order_num}}单</span>
            </div>
            <p>{{"￥"+v.float_minimum_order_amount}}起送 / {{v.piecewise_agent_fee.tips}}</p>
          </div>
          <div>
            <p>保 准 票</p>
            <p><span>{{v.delivery_mode.text}}</span> <span>准时达</span> </p>
            <p>
              <span>{{v.distance}}/</span>
              <span style="color:#0074e2;">{{v.order_lead_time}}</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { msite, spfl, fjsj } from "@/components/api/getdata";
import Headers from "./headers";
export default {
  name: "ahome",
  components: { Headers },
  data() {
    return {
      data: {},
      list: [],
      fj: [],
      geohash:"",
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 8,
        slidesPerColumn: 2
      }
    };
  },
  async created() {
    this.geohash = this.$route.query.geohash;
    var geohash = this.$route.query.geohash;
    const res = await msite({}, geohash);
    this.data = res.data;
    this.$store.commit("addcity",res.data)
    // console.log(res.data);


    const fl = await spfl();
    this.list = fl.data;
    console.log(fl.data)

    const fj = await fjsj({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    });
    this.fj = fj.data;
    // console.log(fj.data);
  }
};
</script>

<style lang="scss" scoped>
.ahome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
#lunbo1 {
  width: 100%;
  height: 4rem;
  background: white;
  margin-bottom: 0.2rem;
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    width: 25%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.22rem;
    color: #7b7b7b;
    > img {
      width: 0.85rem;
      height: 0.85rem;
      margin-bottom: 0.2rem;
    }
  }
}

.fjsj {
  width: 100%;
  background: white;
  > p {
    color: #b0b0b0;
    padding: 0.2rem;
    > span {
      font-size: 0.25rem;
    }
  }
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
        text-overflow:ellipsis;
        white-space: nowrap;
        >span{
            background: #ffdc30;
            border-radius: 2px;
            font-size: 0.24rem;
            padding: 0.01rem 0.05rem;
        }
      }
      > div:nth-child(2) {
        font-size: 0.18rem;
        color: #b1b1b1;
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
      >p:nth-child(2){
         
          font-size: 0.12rem;
          >span:nth-child(1){
               color:white;
               background: #258be6;
               border: .01rem solid #258be6;
               padding: 0.01rem 0.05rem;
               border-radius: 2px;
          }
          >span:nth-child(2){
               color:#258be6;
               background: white;
               border: .01rem solid #258be6;
               padding: 0.01rem 0.05rem;
               border-radius: 2px;
          }
      }
    }
  }
}
</style>