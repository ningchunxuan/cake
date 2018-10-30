<template>
    <div class="goods">
            <div class="pro-list-title" id="list-title-1">
                <h2>冰淇淋
                    <span>10天生命的意式杰拉朵冰淇淋</span>
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
            <div class="pro-list-title" id="list-sell-out">
                <h2>季节性下线
                    <span>在合适的季节，吃恰当的食物</span>
                </h2>
            </div>
            <ul class="coming-soon">
                <li>
                    <div>
                        <div class="list-pro-content">
                            <a href="#">
                                <div class="list-pro-img" >
                                    <img class="lazy" src="../../img/latte.jpg" style="opacity: 1;">
                                </div>
                                    <h3>Latte Gelato
                                        <span>拿铁冰淇淋</span>
                                    </h3>
                                    <span class="price">¥45.00/盒</span>
                            </a>    
                            <a href="#" class="sell-out" name="sell-out">
                                <span>敬请期待</span>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <div class="list-pro-content">
                            <a href="#" >
                                <div class="list-pro-img" >
                                    <img class="lazy" src="../../img/durian ice.jpg" style="opacity: 1;">
                                </div>
                                    <h3>Durian Gelato
                                        <span>榴莲冰淇淋</span>
                                    </h3>
                                    <span class="price">¥45.00/盒</span>
                            </a>    
                            <a href="#" class="sell-out" name="sell-out">
                                <span>敬请期待</span>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
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
                $.get(baseUrl+'/goodslist',{goodsid:'ice'},function(res){
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