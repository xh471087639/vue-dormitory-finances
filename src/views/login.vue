<template>
  <div class="loginMain">
    <div class="head col-sm-12">
      <div class="col-sm-12 text-center">欢迎登陆</div>
    </div>

    <div class="loginMainBody col-sm-12">
      <div class="col-sm-offset-4 col-sm-4 headImg">
        <div class="col-sm-10 col-sm-offset-1">
          <img class="img-circle col-sm-10 col-sm-offset-1" src="../assets/img/headImg.jpg">
        </div>
        <div class="col-sm-10 col-sm-offset-1 text-center">
          {{username?username:defaultName}}
        </div>
      </div>

      <div class="col-sm-12">
        <div class="loginInput col-sm-10 col-sm-offset-1 ">
          <img src="../assets/img/user.png">

          <input name="username" tabindex="0" type="text" placeholder="请输入用户名" v-model="username"
                 @blur="checkUserName">
        </div>
        <div class="loginInput col-sm-10 col-sm-offset-1">
          <img src="../assets/img/password.png">
          <input class="" name="password" tabindex="1" type="password" placeholder="请输入密码" v-model="password"
                 @blur="checkPassword">
        </div>
      </div>

      <div class="col-sm-12 loginShell">
        <div class="col-sm-10 col-sm-offset-1 ">
          <button class="btn btn-success col-sm-12" name="login" @click="login">登陆</button>
        </div>
        <div class="col-sm-10 col-sm-offset-1">
          <router-link tag="button" class="btn btn-success col-sm-12" name="regist" to="/regist">注册</router-link>
        </div>
        <div class="col-sm-10 col-sm-offset-1 lookAround">
          <a class="text-center col-sm-12" name="lookAround" href="index.html">随便看看(暂无首页)</a>
        </div>
      </div>
    </div>

    <div class="foot col-sm-12">
      <div class="foot-top  col-sm-6 col-sm-offset-3">
        <div class="text-center">第三方账号登陆</div>
      </div>
      <div class="foot-mid col-sm-10 col-sm-offset-2 loginByOther">
        <div class="">
          <img class="" src="../assets/img/QQ.png">
        </div>
        <div class="">
          <img class="" src="../assets/img/wechat.png">
        </div>
        <div class="">
          <div class=" text-center opening">第三方开发ing</div>
        </div>
      </div>

      <div class="foot-bottom col-sm-12 text-center lg-topmargin">
          该技术由创数软件团队-夏浩提供
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "login",
    data: function () {
      return {
        defaultName: '欢迎您的使用',
        username: '',
        password: '',
        img: ''
      }
    },
    methods: {
      DetectionSymbol: function (value) {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (regEn.test(value) || regCn.test(value)) {
          return false;
        } else {
          return true;
        }
      },
      DetectionLength: function (value, min, length) {
        if (value.length > min && value.length <= length) {
          return true;
        } else {
          return false;
        }
      },
      checkUserName: function () {
        let checkEnd = this.DetectionSymbol(this.username) && this.DetectionLength(this.username, 4, 16);
        if (!checkEnd) {
          this.dfmain.PromptBox.displayPromptBox("用户名输入错误(字符数在4-16内，无特殊字符)");
          return false;
        } else {
          this.defaultName = this.username;
          return true;
        }
      },
      checkPassword: function () {
        let checkEnd = this.DetectionLength(this.password, 8, 16);
        if (!checkEnd) {
          this.dfmain.PromptBox.displayPromptBox("密码输入错误(字符数在8-16内)");
          return false;
        } else {
          return true;
        }
      },
      toRegist: function () {
        window.location = '../regist/';
      },
      login: function () {
        let that = this;
        let checkEnd = this.checkUserName() && this.checkPassword();
        if (checkEnd) {
          let formdata = new FormData();
          formdata.append('username', this.username);
          formdata.append('password', this.password);
          new this.dfmain.Interactive({
            childPath: '/login/',
            method: 'POST',
            detail: formdata,
            successCallback: function (result) {
              that.$weui.toast('登陆成功', {
                duration: 600,
                className: 'success',
                callback: function () {
                  that.$router.push('/financialManagement')
                }
              })
            },
            errorCallback: function () {

            },
          }).init();
        }


      },
    },
  }
  // let str = '';
  // let x = str.match(/(\d*\.\d+px|\d*px)/g);
  // let newy = {};
  // for (let i of x) {
  //   newy[i] = i.replace(/px/, '');
  // }
  // for (let i in newy) {
  //
  //   let newNum = parseFloat(newy[i]) / 12;
  //   console.log(newNum, i);
  //   str = str.replace(newy[i] + 'px', newNum + 'rem');
  // }
  // console.log(str)

</script>

<style scoped>
  @import "../assets/lib/css/mobile-reset.css";

  div {
    text-align: center;
    /*padding: 0;*/
  }

  .loginMain {
    position: relative;
    min-height: 100vh;
    width: 100%;
    color: white;
    background-image: url("../assets/img/indexBG.jpeg");
    background-position: top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding-top: 1px;
  }

  .loginMain:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }

  .head {

    margin-top: 0.8rem;
  }

  .head > div {
    font-size: 0.45rem;
  }

  .headImg {
    margin-top: 0.66667rem;
  }

  .headImg > div:first-child > img {
    width: 2.5rem;
    /*height: 2.5rem;*/
  }

  .headImg > div:nth-child(2) {
    font-size: 0.33rem;
    margin-top: 0.2rem;
  }

  .loginMain > div:nth-child(2) {
    margin-top: 1rem;
  }

  .loginInput {
    margin-top: 0.8rem;
    border-bottom: rgba(255, 255, 255, 0.3) solid 1px;
    padding-bottom: 0.17rem;
    padding-left: 0.17rem;
    display: flex;
    justify-content: space-between;
  }

  .loginInput > img,
  .loginInput > input {
    display: inline-flex;
  }

  .loginInput > input {
    flex-grow: 1;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: 0.36rem;
    margin-left: 0.3rem;
  }

  .loginInput > img {
    height: 0.6rem;
    width: 0.6rem;
    border: none;
    padding: 0;
  }

  .loginInput select {
    display: inline;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    height: 0.4rem;
    margin-left: 1.6667rem;
    font-size: 0.4rem;
  }

  .loginInput select > option {
    background-color: #666666;

  }

  .loginInput input::-webkit-input-placeholder {
    color: white;
  }

  [name=login],
  [name=regist] {
    background-color: #01cd9a;
    font-size: 0.4rem;
    margin-top: 0.4rem;
    border-radius: 3.5rem;
    padding: 0.1rem 1.9rem;
    width: 100%;
  }
  [name=login]{
    margin-top: 0.7rem;
  }

  [name=regist] {
    background-color: rgba(0, 0, 0, 0);
    border: white solid 1px;
  }

  [name=lookAround] {
    color: white;
    font-size: 0.39rem;

    /*padding: 4.167rem 0 4.167rem;*/
  }

  .lookAround {
    margin-top: 0.3rem;
  }

  .foot {
    font-size: 0.36rem;
    margin-top: 1.2rem;
  }
  .foot-top{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.2rem;
  }
  .foot-top:before,
  .foot-top:after{
    content: '';
    flex-grow: 1;
    display: inline-flex;
    height: 1px;
    border-bottom: 1px solid rgba(255,255,255,0.6);
    vertical-align: middle;
    align-items: center;
  }
  .foot-top>div{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  .foot img {
    width: 1rem;
    height: 1rem;
  }

  .loginByOther {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginByOther > div {
    display: inline-flex;
    padding-left: 0.2rem;
    padding-right: 0.2rem;

  }
  .opening{
    font-size: 0.3rem;
    font-weight: bold;
    width: 1.5rem;
    border:0.03rem solid #01cd9a;
    border-radius: 0.2rem;
    padding: 0.1rem;
  }
  .foot-bottom{
    margin-top: 2rem;
    font-size: 0.34rem;
  }
</style>
