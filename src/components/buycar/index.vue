<template>
    <div class="buycar">
        <div class="top">
            <div class="logo">
                <div>
                    <i @click="back()"><</i>
                </div>
                <span class="identification">购物车</span>
                <div>
                    <span>{{this.$store.state.city}}</span>                
                </div>
            </div> 
        </div>
        <div class="main">
            <p class="top-tip" ref="top-tip" @click="btn" :class="className">· 满100元免配送服务费 ·</p>
            <div class="add-goods">
                <ul>
                    <li class="cart-object-goods-item scene_area " v-for="(obj,index) in buycar" v-bind:key="index" >
                        <div class="cart-pro-box">
                            <a href="#">
                                <img :src="obj.bigimg" >
                            </a>
                            <div class="cart-pro-title">
                                <a href="#">
                                    <h2>{{obj.title}}</h2>
                                    <p>{{obj.name}}</p>
                                </a>
                                <span>规格：{{obj.size}}</span><br />
                                <br />
                                ￥<span class="cart-price" >
                                    {{obj.price*obj.number}}.00
                                </span>
                            </div>
                        </div>
                        <div class="cart-pro-number">
                            <button class="sub" @click="sub(index, obj._id)">-</button>
                            <span class="quantity">{{obj.number}}</span>
                            <button class="add" @click="add(index, obj._id)">+</button>
                        </div>
                        <span class="delete" @click="del(obj._id)">删除</span>
                        <div class="ps">
                            <img src="../../img/tableware.jpg" alt="" />
                            <span class="laid-count">每份含免费餐具10套</span><br />
                            <span class="birthday-card">生日牌</span>
                            <a class="birthday-brand">+添加生日牌</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="plases" v-show="loginStatus" @click="gologin()">您的购物车还没有商品</div>
            <p class="top-tip">· 搭配商品 ·</p>
            <div class="with-goods">
                <ul>
                    <li class="adjuncts-list"  v-for="(obj,index) in merchandise" v-bind:key="index">
                        <img :src="obj.bigimg"  class="goods-img"/>
                        <p>{{obj.name}}</p>
                        <p>￥{{obj.price}}</p>
                        <a href="#">
                           <img src="../../img/list-cart.png" class="list-cart" @click="addto(index, obj._id)"/> 
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <ul>
                <li class="delete">
                    <i class="iconfont icon-lajixiang" @click="alldel"></i>
                </li>
                <li class="total">
                    <div class="total-price">
                        <span >￥<i>{{money}}</i>.00</span><br />
                        <span class="merchandise">商品</span>
                    </div>
                    <div>
                        <button class="clearing">去结算</button>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class="addcar"  v-show="bool">
            <div class="win" @click="boolBtn">{{status}}</div>
        </div>
    </div>
</template>

<script>
    import './index.css'
    import baseUrl from '../../utils/baseurl.js'
    export default {
        data(){
            return{
                status: '请登录，再添加购物车',
                bool:false,
                loginStatus: true,
                className: '',
                timer: '',
                buycar:[],
                merchandise:[],
                id:'',
                money:0,
                carnumber:''
            }
          },
          // 页面加载的时候触发
        created() {
            this.init()
          },
          // 页面加载完之后触发
        mounted() {
          },
        methods: {
            init() {
                var $this = this
                if (document.cookie.split('=')[1]) {
                    $.get(baseUrl+'/buycar',{username: document.cookie.split('=')[1]},function(res){
                        // console.log(res)
                        if (res.code === 1) {
                            $this.loginStatus = false
                        }
                        $this.buycar = res.data
                        var total = 0;
                        if($this.buycar && $this.buycar.length > 0){
                            $this.buycar.forEach(function(obj,index){
                                total += obj.number * obj.price
                                // obj.bigimg = require("../.."+obj.bigimg)
                            })
                            $this.money = total
                        }
                        
                        // $this.money = total
                    })
                }
                $.get(baseUrl+'/goodslist',{goodsid:'merchandise'},function(res){
                    $this.merchandise = res.data
                    $this.merchandise.forEach(function(obj,index){
                        obj.bigimg = require("../../"+obj.bigimg)
                    })
                    // console.log(res)
                })
            },
            gologin(){
                if(this.loginStatus === true){
                    this.$router.push('userlogin')
                }
            },
            // 加入购物车
            addto(index){
                var $this = this;
                if (document.cookie.split('=')[1]) {
                    $.get(baseUrl+'/addbuycar',{
                        bigimg: $this.merchandise[index].bigimg,
                        number: $this.merchandise[index].number,
                        size: $this.merchandise[index].size,
                        title: $this.merchandise[index].title,
                        name: $this.merchandise[index].name,
                        price: $this.merchandise[index].price,
                        username: document.cookie.split('=')[1]
                    },function(res){
                        
                    })
                    this.status = '加入成功'
                    this.init()
                }
                this.bool = true
                
            },
            boolBtn() {
                this.bool = false
                if(this.status === '请登录，再添加购物车'){
                    this.$router.push('userlogin')
                }
            },
            // 删除一条购物车商品
            del(_id){
                if (confirm('你确定要删除这个商品嘛？')) {
                    $.get(baseUrl+'/deletebuycar',{id:_id, username: document.cookie.split('=')[1]},function(res){
                    })
                    this.init()
                }
            },
            // 删除全部购物车商品
            alldel() {
                if (confirm('你确定要删除全部商品嘛？')) {
                    $.get(baseUrl+'/alldel',{ username: document.cookie.split('=')[1] },function(res){
                    })
                    this.init()
                }
            },
            btn() {
                this.className = 'active'
            },
            back(){
               history.back(); 
            },
            // 商品数量（减）
            sub(index, _id){
                if (this.buycar[index].number <= 1) {
                    this.buycar[index].number = 1
                } else {
                    this.buycar[index].number--
                }
                $.get(baseUrl+'/updatebuycar',{_id: _id, number: this.buycar[index].number},function(res){
                })
                this.total()
            },
            // 商品数量（加）
            add(index, _id){
                this.buycar[index].number++
                $.get(baseUrl+'/updatebuycar',{_id: _id, number: this.buycar[index].number},function(res){
                })
                this.total()
            },
            total() {
                var total = 0;
                this.buycar.forEach(obj => {
                    total += obj.number * obj.price 
                })
                this.money = total
            }
        
        },
          // data更新的时候就会触发这个更新事件
        updated() {
            // console.log(6666)
        },
        destroyed() {
        }
      
    }
</script>


