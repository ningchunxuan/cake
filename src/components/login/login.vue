<template>
    <div class="verification">
        <div class="top">
            <div class="logo">
                <div>
                    <i @click="back()"><</i>
                </div>
                <span>验证码登录</span>
                <div>
                    <span>{{this.$store.state.city}}</span>
                    
                </div>
            </div> 
        </div>
        <div class="message">
            <ul>
                <li>
                    <input type="text" id="username" placeholder="用户名" v-model="username"/>
                </li>
                <li>
                    <input type="password" name="password" placeholder="输入密码" v-model="password">
                </li>
                <li>
                    <input type="text" name="code" id="imgText" v-model="vercode" placeholder="请输入图片字符">
                    <Verification @getCode="getCode"/>
                </li>
            </ul>
            <button @click="login()">登录</button>
        </div>
        <div class="remember-me">
            <input type="checkbox" name="rememberMe" checked="checked">记住账号
            <router-link :to="{name: 'reg'}">去注册</router-link>
            <a href="#">忘记密码</a>
        </div>
    </div>
</template>

<script>
    import Verification from  '../verification/index.vue'
    import baseUrl from '../../utils/baseurl.js'
    export default {
        data(){
            return{
                username:'',
                password:'',
                vercode: '',
                code: '',
            }
        },
        components:{
            Verification
        },
        created() {
            setTimeout(() => {
                this.code = this.$store.state.code
            }, 1000)
        },
        mounted(){
            
        },
        methods: {
            getCode(code) {
                console.log(code)
            },
            back(){
                history.back();
            },
            login(){
                var $this = this
                if (!this.username) {
                    // alert('请输入用户名');
                    this.$confirm('请输入用户名','退出提醒',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                } else if(!this.password) {
                    // alert('请输入密码');
                    this.$confirm('请输入密码','退出提醒',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                } else if(this.code != this.vercode) {
                    // alert('验证码错误');
                    this.$confirm('验证码错误','退出提醒',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                    $this.$router.push('userlogin')
                } else {
                    $.get(baseUrl+'/login',{username:this.username,password:this.password},function(res){
                        if(res.code === 1){
                            document.cookie = 'username=' + res.username
                            confirm(res.message)
                            $this.$router.push('mine')
                        }else{
                            confirm(res.message);
                            // this.$confirm(res.message,'退出提醒',{
                            //     confirmButtonText: '确定',
                            //     cancelButtonText: '取消',
                            //     type: 'warning'
                            // });
                        }
                    })
                }
            }
        },
        updated() {
        }
    }
</script>

<style>
    .verification{
        width: 100%;
        height: 100%;
        
    }
    .message{
        height: 280px;
        margin-top:20px;
        padding:0 30px;
    }
    .message input{
        width: 100%;
        border: none;
        border-bottom: 1px solid #D5D5D5;
        height: 20px;
        padding: 10px 0;
        line-height: 26px;
        outline: none;
        font-size: 14px;
    }
    .message button{
        display: block;
        width: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 38px;
        height: 38px;
        margin-top: 50px;
        float: left;
        background: #442818;
        color: #fff;
        border: none;
        outline: none;
    }
    #phone{
        border-bottom:1px solid #ccc;
    }
    .remember-me{
        height: 18px;
        overflow: hidden;
        font-size: 12px;
        color: #744F3A;
    }
    .remember-me input, .register-remember input {
        display: inline-block;
        vertical-align: middle;
        margin:0 5px 0 30px;
        height: 16px;
        width: 16px;
        border: 1px solid #D5D5D5;
    }
    .remember-me a {
        display: inline-block;
        float: right;
        margin-right: 30px;
        line-height: 18px;
        color:#442818;
    }
</style>
