import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        list:JSON.parse(localStorage.getItem("list"))||[],
        city:JSON.parse(localStorage.getItem("city"))||[],
        sj:[],
        cart:[],
        num:0
    },
    mutations:{
        add(state,v){
            console.log(v)
            var arr = state.list
            var index = arr.findIndex((item,i)=>{
                return v.name == item.name
            })
            if(index==-1){
                state.list.push(v)
            }else{
                return
            }
        },
        del(state){
            state.list=[]
        },
        addcity(state,v){
            state.city = v
        },
        addsj(state,v){
            state.sj = v
        },
        addcart(state,v){
            var index = state.cart.findIndex((item,key)=>{
                return item.name == v.name
            })
            if(index==-1){
                state.cart.push(v)
            }
        },
        del(state){
            state.cart.map((v,i)=>{
                return v.__v=0
            })
            state.cart=[]
        }
    },
    getters:{
        num(state){
            var s = 0
            state.cart.map((v,i)=>{
                s+=v.__v
            })
            return s
        },
        num2(state){
            var s = 0
            state.cart.map((v,i)=>{
                s+=v.__v*v.specfoods[0].price
            })
            return s
        }
    }
})

store.subscribe(function(mutations,state){
    localStorage.setItem("list",JSON.stringify(state.list))
    localStorage.setItem("city",JSON.stringify(state.city))
})
export default store