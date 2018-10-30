<template>
    <div class="sort">
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
        <div class="products-list-nav-box">
            <div class="products-list-nav">
                <ul class="list-nav">
                    <li>
                        <router-link :to="{name: 'cake'}">蛋糕</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'ice'}">冰淇淋</router-link>
                    </li>
                    <li ><a>咖啡下午茶</a></li>
                    <li>
                        <router-link :to="{name: 'bread'}">面包</router-link>
                    </li>
                    <li >
                        <router-link :to="{name: 'temperature'}">常温蛋糕</router-link>
                    </li>
                    <li><a>设计师礼品</a></li>
                </ul>
            </div>
        </div>
        <main>
            <router-view/>
        </main>
        <!-- <div class="lost-bottom">
            <div>没了</div>
        </div> -->
    </div>
</template>

<script>
import './index.css'
export default {
    data() {
        return {
            show: false,
        }
    },
    methods:{
        back(){
           history.back(); 
        }
    },
            
  
    components:{
    }
  
}
</script>