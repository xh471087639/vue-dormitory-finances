<template>
  <div class="normalFunction" >

    <div class="functionShell" v-for="(item,index) in functionList" v-bind:key="item.name">
      <div class="functionHead">
        <div class="fh-text">{{item.name}}</div>
        <img class="foldIcon" @click="changeFoldStatus(index)" v-bind:class="{'routeArrow':fold[index]}" src="../assets/img/arrowDown.png"/>
      </div>
      <div class="functionBody" v-bind:style="{'max-height':fold[index]?0:item.childList.length+'rem'}" >
        <div class="functionList" v-for="(listItem) in item.childList" v-bind:key="listItem.name" @click="listItem.canChange?toEdit(listItem.name,listItem.value):''">
          <div class="infTitle">{{listItem.name}}</div>
          <div class="infDetail">
            <div class="infContent">{{listItem.value}}</div>
            <img v-show="listItem.canChange" class="changeInfIcon" src="../assets/img/arrowRight.png"/>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>

  //组件规定数据结构
  // [{
  //   name:'',
  //   childList:[{
  //     name:'',
  //     value:'',
  //     canChange:false,
  //   }]
  // }]
  export default {
    name: "normal-function",
    props:{
      'function-list':{
        type:Array,
        default:new Array(),
      },
    },
    data:function () {
      return {
        fold:[],
      }
    },
    components:{
    },
    methods:{
      changeFoldStatus:function (index) {
        this.$set(this.fold,index,!this.fold[index]);
      },
      toEdit:function (name,value) {
        console.log(value)
        this.$emit('toEdit',{
          name:name,
          value:value
        })
      }
    },
    mounted() {
      this.fold=new Array(this.functionList.length);
    }
  }
</script>

<style scoped>
  .routeArrow{
    transform: rotate(-90deg);
  }
  .normalFunction{
    background-color: rgb(247,245,246);
    width: 100%;
  }
  .functionShell{
    background-color: white;
  }
  .functionHead{
    padding: 0.1rem 0.2rem;
    border-bottom: 0.03rem solid rgba(0,0,0,0.15);
    display: flex;
    /*margin-bottom: 0.1rem;*/
  }
  .fh-text{
    flex-grow: 1;
    color: #337ab7;
    font-size: 0.35rem;
  }
  .foldIcon{
    width: 0.4rem;
    height: 0.4rem;
    transition:all 0.2s ease;
  }
  .functionBody{
    transition: all 0.3s ease;
    padding: 0 0.4rem 0;
    overflow: hidden;
  }
  .functionBody>div:last-child{
    margin-bottom: 0.4rem;
  }
  .functionList{
    display: flex;
    border-bottom: 0.02rem solid rgba(0,0,0,0.1);
    padding: 0.3rem 0 0.1rem;
  }
  .functionList>div{
    display: inline-flex;
  }
  .infTitle{
    flex-grow: 1;
    font-size: 0.35rem;
  }
  .infContent{
    font-size: 0.35rem;
    color: #777;
  }
  .changeInfIcon{
    width: 0.35rem;
    height: 0.35rem;
    margin-left: 0.1rem;
  }
  .infDetail{
    align-self: center;
  }
  .functionShell:first-child{
    margin-bottom: 1px;
  }
  .functionShell+.functionShell{
    padding-top: 1px;
    margin-top: 0.2rem;
  }


</style>
