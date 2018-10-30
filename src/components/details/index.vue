<template>
    <div class="details">
        <div class="top">
            <div class="logo">
                <div>
                    <i @click="back()"><</i>
                </div>
                <img src="../../img/app-icon.png" height="45"  alt="" />
                <div>
                    <span >{{this.$store.state.city}}</span>
                    
                </div>
            </div> 
        </div>
        <div class="main">
            <div class="img-bigbox">
                <ul class="img-smallbox">
                    <li>
                        <img :src="goods.deimg" alt="" />
                    </li>
                    
                </ul>
            </div>
            <div class="details-box">
                <div class="pro-title">
                    <h3>{{goods.title}}</h3>
                    <span>{{goods.name}}</span>
                </div>
                <p class="price-label">
                    <span class="top-price">{{goods.price}}</span>
                </p>
                <div class="pro-details-label">
                        <a href="#">情侣&nbsp;›</a>
                        <a href="#">人气&nbsp;›</a>
                        <a href="#">白色情人节&nbsp;›</a>
                        <a href="#">生日&nbsp;›</a>
                        <a href="#">结婚&nbsp;›</a>
                        <a href="#">相识&nbsp;›</a>
                        <a href="#">总有一款适合你&nbsp;›</a>
                </div>
                <ul class="details-taste">
                    <li>
                        <img src="../../img/winebottle.png" >                        
                        爱尔兰百利甜酒
                    </li>
                    <li>
                        <img src="../../img/flower.png"  >                        
                        当日空运云南玫瑰
                    </li>
                </ul>
                <div class="select-card">
                    <ul class="select-specifications">
                        <li>
                            <a id="J-specifications">已选择：
                                <span>2.0磅</span>
                                <i>></i>
                            </a>
                        </li>

                    </ul>
                    <div class="details-options-card">
                        <ul class="details-options">
                            <li class="details-options-size">
                                <i></i>17.5x17.5
                            </li>
                            <li class="details-options-laid">
                                <i></i>含10套餐具
                            </li>
                            <li class="details-options-unmber">
                                <i></i>适合7-8人分享
                            </li>
                            <li class="details-options-time">
                                <i></i>最早明天 09:30配送
                            </li>
                        </ul>
                    </div>

                    <ul class="store-info">
                        <li>
                                
                            <img src="" >
                            <span>保鲜条件</span>
                            <div>
                                <p>0-4℃保藏10小时，5℃食用为佳</p>
                            </div>
                        </li>
                        <li data-sweet="4" id="sweetList">
                            <img src="">
                            <span>参考甜度</span>
                            <div>
                                <p class="sweet-list">
                                    <i class="active"></i>
                                    <i class="active"></i>
                                    <i class="active"></i>
                                    <i class="active"></i>
                                    <i></i>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="details-introduction">
                <div class="character">
                    <p>{{goods.character1}} </p>
                    <p>{{goods.character2}} </p>
                    <p class="c-red">{{goods.character3}} </p>
                    <p class="c-red">{{goods.character4}} </p>
                </div>
                <div class="details-img">
                    <ul>
                        <li v-for="url in imgArry">
                            <img :src="url" alt="" />
                        </li>
                        <li class="reference">上图片仅供参考，请以收到实物为准。</li>
                    </ul>
                </div>
            </div>
        </div>
        <ul class="add-car">
            <li class="buy" @click="buynow()">
                立即购买
            </li>
            <li class="add-to"  @click="addto()">
                <a href="#"  @click="bool=true">加入购物车</a>
            </li> 
        </ul>

        <!-- 加入购物车弹框 -->
        <div class="addcar"  v-show="bool">
            <div class="win" @click="boolBtn()">{{status}}</div>
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
                id:'',
                imgArry: [],
                goods:{},
                coverShow: false,
                bool:false,
            }
        },
        created() {
            this.id = this.$route.params.id
            this.init()
        },
        mounted(){
            this.activeCity = this.$store.state.city
        },
        methods:{
            boolBtn() {
                this.bool = false
                if (this.status === '请登录，再添加购物车') {
                    this.$router.push('userlogin')
                }
            },
            back(){
               history.back(); 
            },
            init() {
                var $this = this
                console.log(this.id)
                $.get(baseUrl+'/goodslist',{id:$this.id},function(res){
                    console.log(res)
                    $this.goods = res.data[0]
                    $this.goods.bigimg = require("../../"+$this.goods.bigimg)
                    $this.goods.deimg = require("../../"+$this.goods.deimg)
                    $this.goods.imgArry.forEach(function(url,index){
                        $this.imgArry.push(require("../../"+url))
                    })
                    console.log($this.imgArry)
                })
            },
            buynow(){
                var $this = this;
                if(document.cookie.split('=')[1]){
                    $.get(baseUrl+'/addbuycar',{
                        bigimg: this.goods.bigimg,
                        number: this.goods.number,
                        size: this.goods.size,
                        title: this.goods.title,
                        name: this.goods.name,
                        price: this.goods.price,
                        username: document.cookie.split('=')[1]
                    },function(res){
                        if (res.code === 1) {
                            $this.$router.push('buycar')
                        }
                    })
                }
                
            },
            addto(){
                 var $this = this;
                if(document.cookie.split('=')[1]){
                    $.get(baseUrl+'/addbuycar',{
                        bigimg: this.goods.bigimg,
                        number: this.goods.number,
                        size: this.goods.size,
                        title: this.goods.title,
                        name: this.goods.name,
                        price: this.goods.price,
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