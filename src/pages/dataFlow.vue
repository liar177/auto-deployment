/* 这是主页面，用来展示数据流和下发控制指令 */
<template>
  <div class="app" >
    <div class="titline">
      <h1 class="el-icon-edit">
        DataFlow
        <span class="onlineStatus">{{status == true ? '(在线)':'(离线)'}}</span>
      </h1>
      <div class="crumbs">/index&nbsp;{{crumbs}}</div>
    </div>
    <div class="dataflows" ref="data">
        <div v-for="(item,index) in data"  :key="index" class="data-box sendCmd">
          <div class="color-thumb " :class="`thumb${index+1}`">
            <i class="iconfont" :class="icon(index)"></i>
          </div>
          <div class="rightbox">
            <div class="dataName">{{item.id}}</div>
            <div class="dataDescri">此按钮控制装置上的RGB信号灯绿光亮灭，点击信号反转</div>
            <div class="dataBottmline">
              <div class="dataVal">{{item.current_value}}</div>
              <div @click="sendcmd(index)" v-if="item.id == 'MOTOR_STATUS' || item.id == 'LED_Light'" class="dataButton">发送</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      crumbs:'',//这是面包屑导航 使用route对象的fullPath属性
      content:'',
      isClick:0,
      data:null,
      iconName:null,
      motor_status:null,
      timer:null,
      status:false
    }
  },
  computed:{
    iconclass(){
      var icon
      return this.iconName
    }
  },
  created(){
    //this.getOnline_status();
    //获取设备数据流信息--可用
    const that = this ;
    this.onenetApi.getDataStreams(710549685).done(function (data) {
            that.data = data.data
            that.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
      })
    });
    console.log(this.data)
    //console.log(document.getElementsByTagName("html")[0])
    console.log(this.$router)
    console.log(this.$route)
    this.crumbs = this.$route.fullPath;
  },
  mounted(){
    const that = this
    if (this.timer) {
	    clearInterval(this.timer)
		} else {
		this.timer = setInterval(() => {
      that.getnewData()
		}, 5000)
		}
  },
  beforeDestroy(){
   clearInterval(this.timer);        
   this.timer = null;
  },
  methods:{
    /* getOnline_status(){
      const that = this
      this.onenetApi.sendCommand(710549685, `led:1`).done(function (data) {
            console.log('api调用完成，服务器返回data为：', data);
            if(data.errno){
              that.status = false
            }else{
              //that.motor_status = !status
              that.status = true
            }
            console.log(that.status)
        });
    }, */
    getnewData(){
      const that = this

      this.onenetApi.sendCommand(710549685, `led:1`).done(function (data) {
            console.log('api调用完成，服务器返回data为：', data);
            if(data.errno){
              that.status = false
            }else{
              //that.motor_status = !status
              that.status = true
            }
            console.log(that.status)
            that.onenetApi.getDataStreams(710549685).done(function (data) {
                console.log(data)
              for(var i=0;i<data.data.length;i++){
                var index = data.data.findIndex(item=>item.id == that.data[i].id)
                if(data.data[index].current_value != that.data[i].current_value){
                  console.log("1")
                    that.data = [];
                    that.data.push(...data.data);
                    that.status = true
                    break;
                    
                }else{
                  console.log("2")
                  that.status = false
                }
              }
              that.$nextTick(function () {
          // DOM 现在更新了
          // `this` 绑定到当前实例
        })
      });

      });
      
    },
    me1(){
      return 1
    },
    sendcmd(index){
      const that = this;
      var item = this.data[index].id
      var status = this.data[index].current_value
      if(item == 'LED_Light'){
        if(status==0){
          status = 1
        }else{
          status = 0
        }
      }else{
        //步进电机控制 先不写
      }
      this.onenetApi.sendCommand(710549685, `${item}:${status}`).done(function (data) {
            console.log('api调用完成，服务器返回data为：', data);
            if(data.errno){
              that.$message({
              message: data.error,
              type: 'error'
            });
            }else{
              that.$message({
              message: '发送成功！',
              type: 'success'
            });
              //that.motor_status = !status

                that.onenetApi.getDataStreams(710549685).done(function (data) {
                      that.data = []
                      that.data.push(...data.data)
                      that.$nextTick(function () {
                  // DOM 现在更新了
                  // `this` 绑定到当前实例
                })
              });
            }
            
            
        });
      
    },
    icon(index){
      var iconName ;
      var name = this.data[index].id
      switch (name){
        case 'MQ7':
        case 'MQ2':
          iconName = 'icon-yanwubaojing';
          break;
        case 'BH1750':
          iconName = 'icon-guangzhao'
          break;
        case 'LED_Light':
          iconName = 'icon-dengguang'
          break;
        case 'sr501':
          iconName = 'icon-suoyourenyuan'
          break;
        case 'DHT11_HUM':
          iconName = 'icon-wendu'
          break;
        case 'DHT11_TEM':
          iconName = 'icon-wendu'
          break;
        case 'MAX_MQ7':
          iconName = 'icon-yanwubaojing'
          break;
        case 'SR04':
          iconName = 'icon-yanjizhushou-shangchuan_julichuanganqi'
          break;
        case 'MOTOR_STATUS':
          iconName = 'icon-dianjizhuansu'
          break;
      }
      return iconName
    }
  }
}
</script>
<style lang="less">
.onlineStatus{
  font-size: 14px;
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
    .dataflows{
      width: 90%;
      margin: 0 auto;
      padding: 2rem;
      padding-right: 0;
      display: flex;
      justify-content: space-around;flex-wrap:wrap;
      .data-box{
        width: 25%;
        min-width: 25%;
        height: 4rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
        background-color: #fff;
        border-radius: 3px;
        border: none;
        position: relative;
        margin-bottom: 30px;
        margin-right: 30px;
        display: flex;justify-content: space-between;align-items: center;
        .color-thumb{
          width: 80px;
          height: 80px;
          margin: 10px;
          margin-right: 10px;
          border-radius: 3px;
          line-height: 94px;
          text-align: center;
          margin-right: 15px;
          display: flex;
          justify-content: center;align-items:center;
          .iconfont{
            font-size: 22px;
            color: #fff;
          }
        }
        .thumb1{
          background-color: #fc544b !important;
        }
        .thumb2{
          background-color:#6777ef !important;
        }
        .thumb3{
          background-color:#6610f2 !important;
        }
        .thumb4{
          background-color:#6f42c1!important;
        }
        .thumb5{
          background-color:#e83e8c !important;
        }
        .thumb6{
          background-color:#fd7e14 !important;
        }
        .thumb7{
          background-color:#ffc107 !important;
        }
        .thumb8{
          background-color:#28a745 !important;
        }
        .thumb9{
          background-color:#20c997 !important;
        }
        .thumb10{
          background-color:#17a2b8 !important;
        }
        .rightbox{
          width: 80%;
          height: 80px;
          word-wrap: break-word;
          display: flex;flex-direction: column;
          justify-content: space-around;
          .dataName{
            font-weight: 700;
          }
          .dataDescri{
            font-size: 12px;
          }
          .dataBottmline{
            display: flex;
          }
          .dataVal{
            font-weight: 700;
            color: #34395e;
            margin-right: 0.5rem;
          }
          .dataButton{
            width: 25%;
            height: 1rem;
            box-shadow: 0 2px 6px #acb5f6;
            background-color: #6777ef;
            border-color: #6777ef;
            border-radius: 0.15rem;
            color: #fff;
            display: flex;justify-content: center;align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>