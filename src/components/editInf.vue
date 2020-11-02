<template>
  <transition name="fade">
    <div class="editInf" v-show="showStatus">
      <div class="editInner">
        <div class="editTopDir"></div>
        <div class="editName">{{editData.name}}</div>
        <div class="editInput">
          <input v-model="editData.keyValue" type="text" v-bind:placeholder="'请输入'+editData.keyDetail"/>
        </div>
        <div class="editBtn">
          <button @click="upData">确认</button>
          <button @click="changeStatus">取消</button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  //传入数据示例
  // editData:{
  //   name:{
  //   default:'姓名',
  //       type:String,
  //   },
  //   keyValue:{
  //   default:'',
  //       type:String,
  //   },
  //   url:{
  //   default:'',
  //       type:String,
  //   },
  //   nameKey:{
  //   default:'',
  //       type:String,
  //   }
  // }
  export default {
    name: "editInf",
    props:{
      editData:{
        type:Object,
      }

    },
    data:function () {
      return{
        showStatus:false,
      }
    },
    methods:{
      upData:function () {
        let that = this;
        let formdata = new FormData();
        formdata.append(that.editData.nameKey, that.editData.keyValue);

        new that.dfmain.Interactive({
          childPath: that.editData.url,
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.$weui.toast('操作成功',{
              duration: 1200,
              className:'success',
            })
            that.showStatus=false;
          },
          errorCallback: function (result) {
            that.$weui.toast('由于' + result.msg + ',修改' + that.editData.name + '失败,请重试',{
              duration: 1200,
              className:'error',
            })
            that.showStatus=false;
          },
        }).init();
      },
      changeStatus:function () {
        this.showStatus=!this.showStatus;
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .editInf{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.6);
    z-index: 999;
  }
  .editInner{
    position: relative;
    width: 7rem;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 0.25rem;
    padding: 0 0.2rem 0.1rem;
  }
  .editInner>div{
    display: inline-flex;
    width: 100%;

  }
  .editTopDir{
    justify-content: center;
  }
  .editTopDir:before{
    content: '';
    width: 1.8rem;
    border-bottom: 0.05rem solid rgba(35, 183, 229, 0.9);
  }
  .editBtn{
    justify-content: space-between;
    margin-top: 0.7rem;
  }
  .editBtn>button{
    width: 40%;
    font-size: 0.4rem;
    background-color: transparent;
  }
  .editBtn>button:first-child{
    color: #67b168;
  }
  .editBtn>button:nth-child(2){
    color: rgba(128, 128, 128, 0.9);
  }
  .editName{
    text-align: center;
    justify-content: center;
    font-size: 0.42rem;
  }
  .editInput{
    margin-top: 0.5rem;
    justify-content: center;
  }
  .editInput>input{
    font-size: 0.36rem;
    padding: 0.05rem 0.2rem;
  }
  .editInput>input::placeholder{
    font-size: 0.36rem;
    color: #777;
  }
  .fade-enter,
  .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active{
    transition: opacity 0.25s ease;
  }
  .fade-enter-to,
  .fade-leave{
    opacity: 1;
  }
</style>
