<template>
  <div id="container">
    <main>
      <transition name="fade-transform" mode="out-in">  
        <router-view/>
      </transition>
    </main>
    <Footer/>
  </div>
</template>

<script>
  import Footer from './footer/index.vue'
  import '../font/iconfont.css'
  import '../css/base.css'
  import '../css/animate.css'
  export default {
    
    components: {
        Footer
    }
  }
</script>


<style>
    html,body,#app,#container{
        height:100%;

    }
    #container{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    main{
      flex:1;
      display:flex;
    }
    .fade-transform-leave-active,.fade-transform-enter-active{
        transition:all ,0.2s;
    }
    .fade-transform-enter{
        opacity:0;
        transform:translatex(-30px);
    }
    .fade-transform-leave-to{
        opacity:0;
        transform:translatex(30px);
    }
</style>
