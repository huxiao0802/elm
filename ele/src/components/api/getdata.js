import {Request} from "./request"

//接口城市 获取所选城市信息
//guess：定位城市， hot：热门城市， group：所有城市 /:id
export const city  = data => Request.getData({
    url:"/api/v1/cities",
    method:"get",
    data,
})

//获取所选城市信息
export const city2  = (data,id) => Request.getData({
    url:"/api/v1/cities/"+id,
    method:"get",
    data,
})

//搜索内容
export const pois  = data => Request.getData({
    url:"/api/v1/pois",
    method:"get",
    data,
})

//根据经纬度详细定位
export const msite  = (data,id) => Request.getData({
    url:"/api/v2/pois/"+id,
    method:"get",
    data,
})

//获取食品分类
export const spfl  = data => Request.getData({
    url:"/api/v2/index_entry",
    method:"get",
    data,
})

//获取附近商家
export const fjsj  = data => Request.getData({
    url:"/api/shopping/restaurants",
    method:"get",
    data,
})

//搜索餐馆
export const find = data => Request.getData({
    url:"/api/v4/restaurants",
    method:"get",
    data,
})

//餐馆详情
export const cgxq  = (data,id) => Request.getData({
    url:"/api/shopping/restaurant/"+id,
    method:"get",
    data,
})

//获取视频列表
export const splb = data => Request.getData({
    url:"/api/shopping/v2/menu",
    method:"get",
    data,
})
//视频分类商家
export const spflsp = data => Request.getData({
    url:"/api/shopping/restaurants",
    method:"get",
    data,
})

//nav 分类
export const navfl = data => Request.getData({
    url:"/api/shopping/v2/restaurant/category",
    method:"get",
    data,
})
//获取详细分类商品
export const xxspfl = data => Request.getData({
    url:"/api/shopping/restaurants",
    method:"get",
    data,
})