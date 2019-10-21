<template>
    <div class="search">
        <Headers>
            <span slot="left" class="el-icon-arrow-left" style="font-size:0.4rem;" @click="$router.go(-1)"></span>
            <span slot="title" style="font-size:0.35rem;font-weight:600;">搜索</span>
            <span slot="right" style="font-size:0.28rem;"></span>
        </Headers>
        <div class="content">

            <div class="sousuo">
                <el-input
                placeholder="请输入商家或美食名称"
                v-model="input"
                clearable>
                </el-input>
                <el-button type="primary" @click="find">提交</el-button>
            </div>
            <!-- 搜索历史 -->

            <div class="sousuolishi" v-show="list.length>0&&flag">
                <div>搜索历史</div>
                <div v-for="(v,i) in list" :key="i" @click="xq(v)">
                    <span>{{v}}</span>
                    <span @click="del(i)">x</span>
                </div>
                <p @click="dels">清空搜索历史</p>
            </div>
            <!-- 搜索出来的商家 -->
            <div class="shangjia" v-show="!flag">
                <div v-show="data.length!=0">商家</div>
                <div v-for="(v,i) in data" :key="i" @click="xq(v)">
                    <img :src="'http://elm.cangdu.org/img/'+v.image_path" alt="">
                    <div>
                        <p>{{v.name}}</p>
                        <p>月售 {{v.recent_order_num}} 单</p>
                        <p>{{v.float_minimum_order_amount}} 元起送 /距离{{v.distance}}</p>
                    </div>
                </div>
                <p v-show="data.length==0">很抱歉！无搜索结果</p>
            </div>
        </div>
    </div>
</template>

<script>
import Headers from "./headers"
import {find} from "@/components/api/getdata"
export default {
    name:"search",
    components:{Headers},
    data() {
        return {
            input:"",
            list:[],
            flag:true,
            data:[]
        }
    },
    created() {
        this.list = JSON.parse(localStorage.getItem("sssp"))||[]
    },
    methods: {
        async find(){
            this.flag=false
            var index = this.list.findIndex((v)=>{
                return v== this.input
            })
            if(index==-1){
                this.list.push(this.input)
            }
            localStorage.setItem("sssp",JSON.stringify(this.list))
            this.list = JSON.parse(localStorage.getItem("sssp"))
            const res = await find({
                geohash:this.$store.state.city.geohash,
                keyword:this.input
            })
            console.log(res)
            this.data = res.data
        },
        del(i){
            this.list.splice(i,1)
            localStorage.setItem("sssp",JSON.stringify(this.list))
        },
        dels(){
            this.list=[]
            localStorage.setItem("sssp",JSON.stringify(this.list))
        },
        xq(v){
            this.input=v
        }
    },
    watch:{
        input(v){
            if(v==""){
                this.flag=true
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .search{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .content{
        flex: 1;
        overflow: auto;
    }
    .sousuo{
        width: 100%;
        margin-bottom: 0.1rem;
        box-sizing: border-box;
        padding: 0.2rem 0.3rem;
        background: white;
        >.el-input{
            width: 76%;
            font-size:0.3rem; 
            color: #6d6d6d;
        }
        >.el-button{
            width: 1.5rem;
            padding:  10px 0px;;
        }
    }
    .sousuolishi{
        >div{
            font-size: 0.28rem;
            width: 100%;
            padding: 0.2rem 0.3rem;
            background: white;
            border-bottom:1px solid #eeeeee;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
        }
        >div:nth-child(1){
            background: none;
            font-weight: bold;
            color: #666;
        }
        >p{
            width: 100%;
            padding: 0.2rem 0.3rem;
            background: white;
            box-sizing: border-box;
            text-align: center;
            color: #3190e8;
            font-weight: bold;
        }
    }
    .shangjia{
        >div{
            width: 100%;
            padding: 0.2rem 0.3rem;
            background: white;
            border-bottom:1px solid #eeeeee;
            display: flex;
            >img{
                width: 0.8rem;
                height: 0.8rem;
                margin-right: 0.2rem;
            }
            >div{
                width:80%;
                font-size: 0.25rem;
                border-bottom: 1px solid #f5f5f5;
                padding: 0.1rem 0rem;
                >p{
                    margin-bottom: 0.1rem;
                    color: #565656;
                }
            }
        }
        >div:nth-child(1){
            background: none;
            font-weight: bold;
            color: #666;
        }
        >p{
            width: 100%;
            padding: 0.2rem 0.3rem;
            background: white;
            box-sizing: border-box;
            text-align: center;
        }
    }
</style>