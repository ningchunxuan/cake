<template>
    <div class="login">
        <div class="top">
            <div class="logo">
                <div>
                    <i @click="back()"><</i>
                </div>
                <img src="../../img/app-icon.png" height="45"  alt="" />
                <div>
                    <span>{{this.$store.state.city}}</span>
                    
                </div>
            </div> 
        </div>
        <div class="main">
            <div class="user-login">
                <!-- <img src="../../img/Baileys.jpg" alt="" /> -->
                    <ul class="skip-login">
                        <router-link :to="{name: 'userlogin'}">
                            <li>
                                <i class="iconfont icon-mine"></i>
                            </li>
                            <li>{{username}}</li>
                            <li>></li>
                       </router-link>
                    </ul>
            </div>
            <div class="feedback">
                <ul>
                    <li><a href="#">用户反馈<i>></i></a></li>
                    <li><a href="#">版本更新<i>></i></a></li>
                    <li><a href="#">服务条款<i>></i></a></li>
                    <li><a href="#">关于我们<i>></i></a></li>
                    <li @click="delcookie()">退出登录</li>
                </ul>
                <div class="service">客服电话 400 650 2121 &nbsp;&nbsp;&nbsp;<i class="iconfont icon-dianhua"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
    import './index.css'
    export default {
        data(){
            return{
                username: '注册/登录'
            }
        },
        created() {
            if (document.cookie) {
                this.username = document.cookie.split('=')[1]
            }
        },
        methods:{
            back(){
               history.back(); 
            },
            delcookie(){
                this.$confirm('你确定要退出登录吗？','退出提醒',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var date = new Date();
                    date.setDate(date.getDate()-1);
                    document.cookie = 'username=' + this.username + ';expires=' + date.toUTCString();
                    this.username = '注册/登录'
                    this.$message({
                        message:'退出成功',
                        type: 'success'
                    })
                }).catch(() => {
                    this.$message({
                        message:'已取消操作',
                        type: 'warning'
                    })
                })
                // return false
                // confirm('你确定要退出登录吗？')
                // var date = new Date();
                // date.setDate(date.getDate()-1);
                // document.cookie = 'username=' + this.username + ';expires=' + date.toUTCString();
                // this.username = '注册/登录'
                
            }
        }
      
    }
</script>

