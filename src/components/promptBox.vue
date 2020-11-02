<template>
  <div class="PromptBox">{{text}}</div>
</template>

<script>
  export default {
    name: "promptBox",
    data:function(){
      return {
        type:'',
        text:''
      }
    },
    methods:{
      displayPromptBox:function (text) {
        this.text=text;
        $('.PromptBox').fadeIn(200);
        $('.PromptBox').fadeOut(1500);
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .PromptBox{
    position: fixed;
    bottom: 150px;
    left: 0;
    right: 0;
    margin-right: auto;
    background-color: rgba(0,0,0,0.7);
    border-radius: 17px;
    color: white;
    font-weight: bold;
    margin-left: 10%;
    width:80%;
    border: none;
    text-align: center;
    padding: 5px;
    font-size: 0.35rem;
    display: none;
  }
</style>
