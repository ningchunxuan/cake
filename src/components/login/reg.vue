<template>
    <div class="verification">
        <div class="top">
            <div class="logo">
                <div>
                    <i @click="back()"><</i>
                </div>
                <span>用户注册</span>
                <div>
                    <span>{{this.$store.state.city}}</span>
                </div>
            </div> 
        </div>
        <div class="message">
            <ul>
                <li>
                    <input class="input-v2" type="text" name="loginName" placeholder="输入手机号码" maxlength="11" id="telephone" v-model="phone">
                </li>
                <li>
                    <input type="text" id="username" placeholder="用户名" v-model="username"/>
                </li>
                <li>
                    <input type="password" name="password" placeholder="密码：8～20字符，需同时包含英文和数字" v-model="password">
                </li>
                <li>
                    <input type="text" name="code" id="imgText" v-model="vercode" placeholder="请输入图片字符">
                    <Verification @getCode="getCode"/>
                </li>
            </ul>
            <button @click="reg()">注册</button>
        </div>
        <div class="register-remember">
            <label>
                <input type="checkbox" name="agree" checked="">已阅读并同意
            </label>
            <a href="#">21客会员协议</a>和
            <a href="#">隐私保护政策</a>
        </div>
    </div>
</template>

<script>
    import Verification from  '../verification/index.vue'
    import baseUrl from '../../utils/baseurl.js'
    export default {
        data(){
            return{
                phone:'',
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
        methods: {
                getCode(code) {
                    console.log(code)
                },
                back(){
                    history.back();
                },
                reg(){
                    var $this = this
                    if(!/^1[3-9]\d{9}$/.test($this.phone)){
                        // confirm('手机号不合法');
                        this.$confirm('手机号不合法','退出提醒',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        });
                        return false;
                    }
                    else if(!/^[a-z][\w\-]{5,19}$/.test($this.username)){
                        // confirm('您输入的用户名不合法');
                        this.$confirm('您输入的用户名不合法','退出提醒',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        });
                        return false;
                    }
                    else if(!/^\S{6,20}$/.test($this.password)){
                        // confirm('密码不能有空格');
                        this.$confirm('密码不能有空格','退出提醒',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        });
                        return false;
                    }
                    else if(this.code != this.vercode) {
                        // alert('验证码错误');
                        this.$confirm('验证码错误','退出提醒',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        });
                        
                    }
                    else{
                        $.get(baseUrl+'/reg',{
                            phone:this.phone,
                            username:this.username,
                            password:this.password
                        },function(res){
                            console.log(res)
                            if (res.code === 1) {
                                confirm(res.message)
                                $this.$router.push('userlogin')

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
        }
    }
</script>

<style>
    .verification{
        width: 100%;
        height: 100%;
        /*display:flex;
        flex-direction:column;
        justify-content:space-between;*/
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
    .register-remember{
        margin-top: 50px;
        height: 18px;
        overflow: hidden;
        font-size: 12px;
        color: #744F3A;
    }
    .register-remember input {
        display: inline-block;
        vertical-align: middle;
        margin:0 5px 0 30px;
        height: 16px;
        width: 16px;
        border: 1px solid #D5D5D5;
    }
    .register-remember a {
        display: inline-block;
        line-height: 18px;
        color:#442818;
    }
</style>
