/* 这是介绍页面，用来介绍网站，和网站的功能 */
<template>
  <div class="app">
    <div class="titline">
      <h1 class="el-icon-edit">Presentation</h1>
      <div class="crumbs">/index&nbsp;{{crumbs}}</div>
    </div>
    <div class="description"><div>This is a brief introduction about the website</div></div>
    <div class="box">
      <div class="project-tit">智能家居系统设计</div>
      <div class="select-box">
        <div class="leftBox">
          <ul>
            
              <li @click="isClick=0" class="select-op" :class="isClick==0?'op-active':''">Brief</li>
              <li @click="isClick=1" class="select-op" :class="isClick==1?'op-active':''">Photo</li>
              <li @click="isClick=2" class="select-op" :class="isClick==2?'op-active':''">Contact</li>
            
          </ul>
        </div>
        <div class="rightBox">
            
              <div class="content">
                <transition name="fade"  mode="out-in">
                  <div class="brief" key="brief" v-if="isClick==0">这是一个本科毕业设计，题目是基于STM32的智能家居系统设计。<br>所以这个网站是对于智能家居系统上传数据的展示，以及控制指令的下发。<br> 路过也是有缘，不如帮我github点个star吧~ 点击右上方的view source  <br>或者下面的contact都可以哦</div>
                  <div class="photo" key="photo" v-else-if="isClick==1"><img src="https://cdn.jsdelivr.net/gh/liar177/repoForImgsBed@master/forTest/装置展示.1ufpfs5cumdc.jpg" alt="系统框架图"></div>
                  <div class="contact" key="contact" v-else-if="isClick==2">邮箱：linliar177@qq.com <br> 博客： <a href="https://liar177.github.io/" target="_blank">liar177.github.io</a> <br> github源码：<a href="https://github.com/liar177/graduation_project_forLin" target="_blank">https://github.com/liar177/graduation_project_forLin</a></div>
                </transition>
              </div>
            
        </div>
      </div>
    </div>
  </div >
</template>

<script>
export default {
  data(){
    return{
      crumbs:'',//这是面包屑导航 使用route对象的fullPath属性
      content:'',
      isClick:0
    }
  },
  created(){
    //console.log(document.getElementsByTagName("html")[0])
    console.log(this.$router)
    console.log(this.$route)
    this.crumbs = this.$route.fullPath;
  },
  
}
</script>

<style lang="less">
/* *{
  font-size: 16px;
} */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s  !important;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0  !important;
}
li{
  list-style-type: none;
}
  .app{
    width: 100%;
    font-weight: 400;
    font-family: 'Nunito', 'Segoe UI', arial;
    color: #6c757d;
    position: relative;
    .titline{
      width: 100%;height: 1.5rem;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
      display: flex;justify-content:space-between;align-items:center;
      h1{
        margin-bottom: 0;
        font-weight: 700;
        display: inline-block;
        font-size: 24px;
        margin-top: 3px;
        margin-left: 6rem;
        color: #34395e;
      }
      .crumbs{
        margin-right: 1rem;
        font-size: 0.5rem;
      }
    }
    .description{
      width: 50%;
      padding: 0.5rem;
      margin: 0 auto;
      display: flex;
      align-items: center;justify-content: space-between;
      position: relative;
      div{
        margin-left: 1.5rem;
      }
    }
    .description::before{
      content: ' ';
      border-radius: 5px;
      height: 8px;
      width: 30px;
      background-color: #6777ef;
      display: inline-block;
      position: absolute;
      left: 2%;top: 50%;transform: translateY(-50%);
    }
    .box{
      margin: 0.1rem auto;
      width: 50%;
      height: 20rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
      background-color: #fff;
      border-radius: 3px;
      border: none;
      position: relative;
      margin-bottom: 30px;
      background-color: #fff;
      .project-tit{
        
        line-height: 30px;
        width: 100%;
        min-height: 70px;
        padding: 0 25px;
        display: flex;
        align-items: center;
        color: #6c757d;
        font-weight: 700;
        border-bottom: 1px solid #f9f9f9  !important;
      }
      .select-box{
        padding-top: 1rem;
        padding-bottom: 1rem;
        display: flex;

      }
      .select-box .op-active{
        box-shadow: 0 2px 6px #acb5f6!important;
        color: #fff!important;
        background-color: #6777ef!important;
        border-radius: 5px;
        //transition: ;
      }
      .leftBox{
        width: 30%;
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        ul{
          width: 100%;margin-left: 1rem;
          display: flex;flex-direction: column;
          align-items: flex-start;
          li{
            width: 100%;
            padding:0.5rem 0 0.5rem 0.5rem;
            cursor: pointer;
          }
        }
      }
      .rightBox{
        width: 66%;margin-left:1rem;
        color: #6c757d ;
        line-height: 1rem;
        .content{

          .photo{
            text-align: center;
            
          }
          .contact{
            
            a:link{
              color: #6c757d ;
              font-size: 16px;
            }
            a:visited{
              color: #6c757d ;
              font-size: 16px;
            }
          }
          div{
            word-wrap: break-word;
            img{
              width: 20rem;
              height: 15rem;
            }
          }
        }
      }
    }
  }
</style>
