<template>
    <div class="verification">
        <canvas id="canvas" width="120" height="50"></canvas>
        <a href="#" id="changeImg" @click="change">看不清，换一张</a>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                code: '',
            }
        },
        created() {
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                var $this = this
                /**生成一个随机数**/
                function randomNum(min,max){
                    return Math.floor( Math.random()*(max-min)+min);
                }
                /**生成一个随机色**/
                function randomColor(min,max){
                    var r = randomNum(min,max);
                    var g = randomNum(min,max);
                    var b = randomNum(min,max);
                    return "rgb("+r+","+g+","+b+")";
                }
                drawPic();
                // document.getElementById("changeImg").onclick = function(e){
                //     e.preventDefault();
                //     drawPic();
                // }

                /**绘制验证码图片**/
                function drawPic(){
                    var canvas=document.getElementById("canvas");
                    var width=canvas.width;
                    var height=canvas.height;
                    var ctx = canvas.getContext('2d');
                    ctx.textBaseline = 'bottom';

                    /**绘制背景色**/
                    ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
                    ctx.fillRect(0,0,width,height);
                    /**绘制文字**/
                    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
                    var verStr = '';
                    for(var i=0; i<4; i++){
                        var txt = str[randomNum(0,str.length)];
                        verStr += txt
                        ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
                        ctx.font = randomNum(16,20)+'px SimHei'; //随机生成字体大小
                        var x = 10+i*25;
                        var y = randomNum(30,40);
                        var deg = randomNum(-45, 45);
                        //修改坐标原点和旋转角度
                        ctx.translate(x,y);
                        ctx.rotate(deg*Math.PI/180);
                        ctx.fillText(txt, 0,0);
                        //恢复坐标原点和旋转角度
                        ctx.rotate(-deg*Math.PI/180);
                        ctx.translate(-x,-y);
                    }
                    $this.code = verStr
                    $this.$store.state.code = verStr
                }
            },
            change() {
                this.init()
                this.$emit('getCode',this.code);
            }
        }
      
    }
</script>

<style>

</style>
