<template>
    <div class="city">
        <Headers>
            <span slot="left" style="font-size:0.45rem;" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i></span>
            <span slot="title" style="font-size:0.35rem;font-weight:600;">{{city.name}}</span>
            <span slot="right" style="font-size:0.28rem;">切换城市</span>
        </Headers>
        <div class="content">
            <!-- 搜索框 -->
            <div class="div1">
                <el-input
                placeholder="输入学校、商务楼、地址"
                v-model="input"
                size="small"
                clearable>
                </el-input>
                <el-button type="primary" @click="find">提交</el-button>
            </div>
            <!-- 搜索结果 -->
            <div class="div2">
                <div class="top" v-show="flag"> 
                    <p>搜索历史</p>
                    <router-link :to="'/msite/ahome?geohash='+item.geohash" tag="div" v-for="(item,key) in this.$store.state.list" :key="key">
                        <p>{{item.name}}</p>
                        <p>{{item.address}}</p>
                    </router-link>
                    <div style="text-align: center;" @click="del" v-show="this.$store.state.list.length>0">清空搜索记录</div>
                </div>


                <div class="button" v-show="!flag">
                    <div v-show="list.length<1">很抱歉，无搜索结果</div>
                    
                    <router-link :to="'/msite/ahome?geohash='+v.geohash" tag="div" v-for="(v,i) in list" :key="i" @click.native="add(v)">
                        <p>{{v.name}}</p>
                        <p>{{v.address}}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Headers from "@/components/headers"
import {city2,pois} from "@/components/api/getdata"
export default {
    name:"city",
    components:{Headers},
    data() {
        return {
            id:"",
            city:[],
            input:"",
            list:[],
            flag:true,
        }
    },
    async created() {
        //获取传过来的ID
       this.id=this.$route.params.id

       //id传过去获取城市
       const res = await city2(
           {},this.id
       )
       this.city = res.data
       console.log(res.data)
    },
    methods: {
        async find(){
            
            const res = await pois({
                city_id:this.id,
                keyword:this.input
            })
            this.flag=false
            this.list = res.data
        },
        add(v){
            this.$store.commit("add",v)
        },
        del(){
            this.$store.commit("del")
            localStorage.removeItem("list");
        }
    },
}
</script>

<style lang="scss" scoped>
.city{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f2f2f2;
  
}
.content {
  flex: 1;
  overflow: auto;
  background: #f5f5f5;
}
.div1{
    width: 100%;
    height: 2rem;
    margin-top: 0.2rem;
    border-top:1px solid #e2e2e2;
    background: white;
    box-sizing: border-box;
    padding: 0.2rem 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.input{
    height: 0.6rem;
    font-size: 0.9rem;
}
.el-button{
    width: 100%;
}
.div2{
    border-top:1px solid #e6e6e6;
    >div{
        >p{
            font-size: 0.22rem;
            padding: 0.1rem 0.3rem;
            border: 1px solid #e6e6e6;
        }
        >div{
        width: 100%;
        height: 1.4rem;
        border-top: 1px solid #e6e6e6;
        box-sizing: border-box;
        padding: 0.3rem 0.3rem;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        >p:nth-child(1){
            font-size: 0.28rem;
        }
        >p:nth-child(2){
            font-size: 0.22rem;
            color: #929292;
        }
    }
    }
}
</style>