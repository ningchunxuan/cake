<template>
    <div class="goods">
        <div class="pro-list-title" id="list-title-1">
            <h2>常温蛋糕
                <span>方便携带，恰到好处的满足</span>
            </h2>
        </div>
        <div class="list-box">
            <ul>
                <li v-for="(obj,index) in goodslist" v-bind:key="index">
                    <div>
                        <div class="list-pro-content">
                            <router-link :to="{name: 'details',params:{id:obj._id}}">
                                <div class="list-pro-img">
                                    <img class="lazy" :src="obj.bigimg" >
                                </div>
                                <h3>
                                    {{obj.title}}
                                    <span>{{obj.name}}</span>
                                </h3>
                                <span class="price">￥{{obj.price}}/{{obj.size}}</span>
                            </router-link>
                            <a href="#" class="cart-add" @click="addto(index, obj._id)">
                                <img src="../../img/list-cart.png" >
                            </a>    
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="lost-bottom">
            <div>没了</div>
        </div>
        
        <!-- 加入购物车弹框 -->
        <div class="addcar"  v-show="bool">
            <div class="win" @click="boolBtn">{{status}}</div>
        </div>
    </div>
</template>

<script>
    import './index.css'
    import baseUrl from '../../utils/baseurl.js'
    export default {
        data() {
            return {
                status:'请登录，再添加购物车',
                bool:false,
                goodslist:[]
            }
        },
        created() {
            this.init()
        },
        methods:{
            init() {
                var $this = this
                $.get(baseUrl+'/goodslist',{goodsid:'temperature'},function(res){
                    $this.goodslist = res.data
                    $this.goodslist.forEach(function(obj,index){
                        obj.bigimg = require("../../"+obj.bigimg)
                    })
                    console.log($this.goodslist[0]._id)
                })
            },
            back(){
               history.back(); 
            },
            boolBtn() {
                this.bool = false
                if (this.status === '请登录，再添加购物车') {
                    this.$router.push('userlogin')
                }
            },
            addto(index){
                 var $this = this;
                 if(document.cookie.split('=')[1]){
                    $.get(baseUrl+'/addbuycar',{
                        bigimg: $this.goodslist[index].bigimg,
                        number: $this.goodslist[index].number,
                        size: $this.goodslist[index].size,
                        title: $this.goodslist[index].title,
                        name: $this.goodslist[index].name,
                        price: $this.goodslist[index].price,
                        username: document.cookie.split('=')[1]
                    },function(res){
                        
                    })
                    this.status = '加入成功'
                 }
                 this.bool = true
                 
            }
        }
    }
 
</script>