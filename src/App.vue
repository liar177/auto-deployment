<template>
  <div id="app">
      <div class="navBar">
        <div class="nav-box">
          <router-link to="/presentation" class="title">SmartHome-System</router-link> 
          <div class="links">
            <a  @click="topages(0,'presentation')" class="presentation " :class="{activelink:activeIndex==0}"><i :class="{activelink:activeIndex==0}" class="iconfont icon-home"></i>Presentation</a>
            <a  @click="topages(1,'dataflow')" class="index  " :class="{activelink:activeIndex==1}"><i :class="{activelink:activeIndex==1}" class="iconfont icon-shuju1"></i>DataFlow</a>
          </div>
        </div>
        <a href="https://github.com/liar177/graduation_project_forLin" target="_blank"  class="github "><i class="iconfont icon-github"></i>view source</a>
        
      </div>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data(){
    return{
      activeIndex:0,
      data:[]
    }
  },
  mounted(){
    
        console.log(document.getElementsByTagName("html")[0])
    var wh = document.getElementsByTagName("html")[0].clientHeight;
    document.getElementById("app").style.height = wh + 'px';

  },
  methods:{
    topages(index,page){
      this.activeIndex = index;
      console.log(this.activeIndex)
      this.$router.push({name:page})
    }
  }
};
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  
}
html, body {width:100%; height:100%}
html{
  font-size: 30px;
}
a{
  text-decoration: none;
  cursor: pointer;
  font-size:0.7rem;
}
a:link{
  color: #fff;
}
a:visited{
  color: #fff;
}
.activelink{
  font-weight: 700;
  color:#dc3545;
}
.activelink .icon-home{
  font-weight: normal !important;
}
#app {
  width: 100%;
  //height: 937px;
  font-size: 16px;
  font-family: 'Nunito', 'Segoe UI', arial;
  background-color: #fafdfb;
  .navBar{
    width: 100%;
    height: 70px;
    background-color: #6777ef;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i{
      color: #fff;
      font-weight: 700;
      font-size: 0.7rem;
      margin-right: 0.5rem;
      vertical-align: baseline;
    }
    .nav-box{
      display: flex;
      align-items: center;
    }
    .title{
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-weight: 700;
      font-size: 1.5rem;
      margin-right: 5rem;
    }
    .links{
      a{
        margin-right:2.5rem ;
        color: #fff;
      }
    }
    .github{
      font-weight:700;
    }
  }
}

</style>
