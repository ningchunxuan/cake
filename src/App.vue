<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">  
        <router-view/>
    </transition> 
  </div>
</template>

<script>

export default {
  name: 'app',
  
}
</script>

<style>
    .fade-transform-leave-active,.fade-transform-enter-active{
        transition:all ,0.2s;
    }
    .fade-transform-enter{
        opacity:0;
        transform:translatex(30px);
    }
    .fade-transform-leave-to{
        opacity:0;
        transform:translatex(-30px);
    }

</style>
