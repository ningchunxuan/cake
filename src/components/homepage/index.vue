<template>
    <div class="box">
        <div class="top">
            <div class="logo">
                <div>
                    <i @click="back()"><</i>
                </div>
                <img src="../../img/app-icon.png" height="45"  alt="" />
                <div>
                    <span @click="coverShow=true">{{this.$store.state.city}}</span>
                </div>
            </div> 
        </div>
        <div class="main">
            <div class="banner" v-on:mouseover="stop()" @mouseout="move()">
                <ul>
                    <li v-for="(obj,index) in arr" v-bind:key="index" v-show="index===mark">
                        <img :src="obj.img" alt="" />
                    </li>
                </ul>
                <div class="bar">
                    <span :class="{ 'active':index===mark }" @click='change(index)' v-for="(obj,index) in arr"></span>
                </div>
            </div>
           
            <div class="content">
                <ul class="rights-box">
                    <li>
                        <i></i>
                        新人首单赠小切块
                    </li>
                    <li>
                        <i></i>
                        满100包邮 
                    </li>
                    <li>
                        <i></i>
                        全程冷链配送
                    </li>
                </ul>
                <ul class="home-menu-box">
                    <li>
                        <router-link :to="{name: 'cake'}">
                            <img src="../../img/cake.png" />
                            <p>蛋糕</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'temperature'}">
                            <img src="../../img/The normal temperature of cake.png" height="92" width="92" />
                            <p>常温蛋糕</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'cake'}">
                            <img src="../../img/afternoon tea.png" height="138" width="138" />
                            <p>下午茶</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'cake'}">
                            <img src="../../img/enterprise .png" height="92" width="92" />
                            <p>企业专区</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'cake'}">
                            <img src="../../img/set meal.png" height="110" width="100" />
                            <p>周套餐</p>
                        </router-link>
                    </li>
                </ul>
                <div class="mould-goods">
                    <h5 class="title-goods">
                        <span>新品</span>
                        <a href="#">
                            更多>
                        </a>
                    </h5>
                    <div class="new-goods">
                        <ul>
                            <li v-for="(obj,index) in homepage" v-bind:key="index" >
                                <router-link :to="{name: 'details',params:{id:obj._id}}"> 
                                    <img :src="obj.bigimg" />
                                    <div class="bottom-price-cart">     
                                        <h4>
                                            <span class="title">{{obj.name}}</span> <span class="price">{{obj.price}}/{{obj.size}}</span>
                                        </h4>    
                                        <p  :title="message">{{obj.chinatitle}}</p>
                                          
                                    </div>
                                </router-link>
                                 <button @click="addto(index, obj._id)">
                                    <i class="iconfont icon-daohanggouwuche"></i>    
                                </button> 
                            </li>
                            
                        </ul>
                    </div>
                </div>
                
                <div class="big-community">
                   <h3>
                        <span>廿一客·文章</span>
                    </h3> 
                
                    <div class="home-mould mould-community magazine">
                        
                        <div class="drag">
                            <ul class="community-list">
                                <li>
                                    <img src="../../img/tercentenary.jpg"  alt="" />
                                    <p>廿一志-周年庆</p>
                                </li>
                                <li>
                                    <img src="../../img/customer service.jpg"  alt="" />
                                    <p>廿一志秋刊·客服Q&A</p>
                                </li>
                                <li>
                                    <img src="../../img/tea.jpg"  alt="" />
                                    <p>春季刊 · 茶</p>
                                </li>
                                <li>
                                    <img src="../../img/Enjoy private.jpg"  alt="" />
                                    <p>春季刊·私享</p>
                                </li> 
                            </ul>
                            <div class="look_more" >
                                <a href="/magazine.html">查看更多</a>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
            <div class="lost-bottom">
                <div>没了</div>
            </div>
        </div> 

        <!-- 选择城市弹框 -->
        <div class="cover" v-show="coverShow">
            <div class="choose-city">
                <p class="home-select-title">选择城市</p>
                <ul>
                    <li v-for="items in city" @click="chooseCity(items)"><a href="#">{{items}}</a></li>
                </ul>
                <button @click="coverBtn">确定</button>
            </div>
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
        data(){
            return {
                status: '请登录，再添加购物车',
                coverShow: false,
                id:'',
                homepage:[],
                message:'mocha',
                bool:false,
                timer: null, //定时器
                mark: 0,//比对图片索引的变量
                saveCity: '广州',
                city: ["上海","北京","天津","杭州","无锡","苏州","广州","深圳"],
                arr:[{
                    // name:1,
                    img:require('../../img/b1.jpg')
                },{
                    // name:2,
                    img:require('../../img/b2.jpg')
                },{
                    // name:3,
                    img:require('../../img/b3.jpg')
                },{
                    // name:4,
                    img:require('../../img/b4.jpg')
                },{
                    // name:4,
                    img:require('../../img/b5.jpg')
                }]
            }
        },
        created() {
                this.init(),
                this.play()
            },
        methods: {
            init(){
                var $this = this
                $.get(baseUrl+'/goodslist',{goodsid:'mocha'},function(res){
                    $this.homepage = res.data
                    
                    $this.homepage.forEach(function(obj,index){
                        obj.bigimg = require("../../"+obj.bigimg)
                    })
                    console.log(res)
                })

            },
           
            // 弹框操作
            chooseCity(name) {
                this.saveCity = name
                // console.log(name)
            },
            coverBtn() {
                this.$store.state.city = this.saveCity
                this.coverShow = false
            },
            boolBtn() {
                
            },
            back(){
                history.back();
            },
            pop:function(){
                this.coverShow = true
                this.bool = !this.bool
            },
            autoPlay() {
              this.mark++;
              if (this.mark > 4) { //当遍历到最后一张图片置零
                this.mark = 0
              }
            },
            play() {
              this.timer = setInterval(this.autoPlay, 2500)
            },
            // 点击获取索引值
            change(i) {
              this.mark = i
            },
            // 鼠标移入停止清楚定时器
            stop() {
                clearInterval(this.timer)
            },
            // 鼠标移出重启定时器
            move() {
                this.timer = setInterval(this.autoPlay, 2500)
            },
            // 加入购物车
            addto(index){
                var $this = this;
                if (document.cookie.split('=')[1]) {
                    $.get(baseUrl+'/addbuycar',{
                        bigimg: $this.homepage[index].bigimg.slice(1),
                        number: $this.homepage[index].number,
                        size: $this.homepage[index].size,
                        title: $this.homepage[index].title,
                        name: $this.homepage[index].name,
                        price: $this.homepage[index].price,
                        username: document.cookie.split('=')[1]
                    },function(res){
                        
                    })
                    this.status = '加入成功'
                }
                this.bool = true
                setTimeout(() => {
                    this.bool = false
                }, 2000)
                if (this.status === '请登录，再添加购物车') {
                    this.$router.push('userlogin')
                }
            }
        }
    }
</script>

<style scoped>
     
</style>