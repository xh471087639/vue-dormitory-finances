<template>

  <div class="main col-sm-12" id="registBody" key="registBody">
    <div class="col-sm-10 col-sm-offset-1 head">
      <div><span class="glyphicon glyphicon-chevron-left" @click="backPage"></span> 注册</div>
      <div class="">
        <img class="col-sm-offset-4 col-sm-4" src="../assets/img/tileImg.png">
      </div>
    </div>

    <div class="col-sm-10 col-sm-offset-1 mainBody">
      <div class="registInput">
        <img src="../assets/img/user.png">
        <input class="col-sm-10" name="username" tabindex="0" type="text" placeholder="请输入用户名" v-model="username"
               @blur="checkUserName">
      </div>
      <div class="registInput">
        <img src="../assets/img/password.png">
        <input class="col-sm-10" name="password" tabindex="1" type="password" placeholder="请输入密码" v-model="password"
               @blur="checkPassword">
      </div>
      <div class="rowRegist">
        <div class="registInput">
          <img src="../assets/img/icon_username_real.png">
          <input class="col-sm-9" name="name" tabindex="2" type="text" placeholder="请输入姓名" v-model="name"
                 @blur="checkName">
        </div>
        <div class="registInput">
          <img src="../assets/img/sex.png">
          <select class="" name="sex" tabindex="3" v-model="sex">
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
      </div>

      <div class="registInput">
        <img src="../assets/img/mail.png">
        <input class="col-sm-10" name="mail" tabindex="4" type="email" placeholder="请输入您的邮箱" v-model="mail"
               @blur="checkMail">
      </div>
      <div class="registInput">
        <img src="../assets/img/verification.png">
        <input class="col-sm-6" name="mailKey" tabindex="6" type="text" placeholder="请输入获取的验证码" v-model="mailKey"
               @blur="checkMailKey">
        <input class="col-sm-4" name="getMailKey" tabindex="5" type="button" v-bind:value="allowCountdown===0?'获取验证码':allowCountdown + 's后可获取验证码'" v-on:click="getEmailKey">
      </div>

      <div class="toRegistShell">
        <button tabindex="7" id="toRegist" v-on:click="toRegist" class="btn btn-success col-sm-10 col-sm-offset-1">注册
        </button>
      </div>

      <div class="mid-topmargin agreeShell col-sm-10 col-sm-offset-1">
        <input type="checkbox" name="agree" class="checkbox-inline" v-model="agree"> 注册即表示同意<a class="registGreen">用户协议及版权声明</a>
      </div>

      <div class="mid-topmargin toLogin col-sm-10 col-sm-offset-1">
        <router-link tag="a" to="/login" class="pull-right normalWhite">已经有账号了？去登陆</router-link>
      </div>
    </div>

    <div class="col-sm-10 col-sm-offset- foot"></div>
    <promptBox ref="promptBox"></promptBox>

  </div>

</template>

<script>
  import promptBox from '../components/promptBox'

  export default {
    name: "regist",
    data: function () {
      return {
        username: '',
        password: '',
        passwords:'',
        name: '',
        sex: 'male',
        mail: '',
        mailKey: '',
        agree: false,
        allowCountdown: 0,
      };
    },components:{
      promptBox
    },
    methods: {
      DetectionSymbol: function (value) {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.;'[\]]/im
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (regEn.test(value) || regCn.test(value)) {

          return false;
        } else {
          return true;
        }
      },
      DetectionNum: function (value) {
        let that = this;
        if (value.length >= 6 && value.length <= 18) {
          return true;
        } else {
          if (value.length > 18) {
            that.$refs.promptBox.displayPromptBox('输入超过18个字符，请重新输入');
            return false;
          } else {
            that.$refs.promptBox.displayPromptBox('账号密码小于6个字符，请重新输入');
            return false;
          }

        }
      },
      DetectionLength: function (value, min, length) {
        if (value.length > min && value.length <= length) {
          return true;
        } else {
          return false;
        }
      },
      DetectionEmail: function (str) {
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
      },
      checkUserName: function () {
        let that = this;
        let checkEnd = this.DetectionSymbol(this.username) && this.DetectionLength(this.username, 4, 16);
        if (!checkEnd) {
          that.$refs.promptBox.displayPromptBox("用户名输入错误(字符数在4-16内，无特殊字符)");
          return false;
        } else {
          return true;
        }
      },
      checkPassword: function () {
        let that = this;
        let checkEnd = this.DetectionLength(this.password, 8, 16);
        if (!checkEnd) {
          that.$refs.promptBox.displayPromptBox("密码输入错误(字符数在8-16内)");
          return false;
        } else {
          return true;
        }
      },
      checkMail: function () {
        let that = this;
        let checkEnd = this.DetectionEmail(this.mail);
        if (!checkEnd) {
          that.$refs.promptBox.displayPromptBox("邮箱输入错误");
          return false;
        } else {
          return true;
        }
      },
      checkName: function () {
        let that = this;
        let checkEnd = this.DetectionLength(this.name, 1, 8);
        if (!checkEnd) {
          that.$refs.promptBox.displayPromptBox("姓名输入错误(字符数在2-8内)");
          return false;
        } else {
          return true;
        }
      },
      checkMailKey: function () {
        let that = this;
        let checkEnd = this.DetectionLength(this.mailKey, 3, 6);
        if (!checkEnd) {
          that.$refs.promptBox.displayPromptBox("邮箱验证码长度错误");
          return false;
        } else {
          return true;
        }
      },


      getEmailKey: function (event) {
        let that = this;
        let checkEnd = this.checkMail() && !this.allowCountdown;
        if (checkEnd) {
          let form = new FormData();
          form.append('email', this.mail);
          new that.dfmain.Interactive({
            childPath: '/regist/getMailKey',
            method: 'GET',
            detail: form,
            successCallback: function (result) {
              (function () {
                that.allowCountdown = 30;
                let IntvId = setInterval(function () {
                  if (that.allowCountdown > 0) {
                    that.allowCountdown--;
                  } else {
                    window.clearInterval(IntvId);
                  }
                }, 1000)
              })()
            },
            errorCallback: function (res) {
              that.$refs.promptBox.displayPromptBox(res.msg);
            },
          }).init();

        }
        else {
          this.checkMail() == true && !this.allowCountdown == false ? that.$refs.promptBox.displayPromptBox("获取过于频繁，请稍后再试") : void (0);
        }
      },
      regist: function () {
        let that = this;
        let checkEnd = this.checkMail() && this.checkUserName() && this.checkPassword() && this.checkMailKey() && this.checkName();
        if (checkEnd) {
          let formdata = new FormData();
          formdata.append('username', this.username);
          formdata.append('name', this.name);
          formdata.append('password', this.password);
          formdata.append('mail', this.mail);
          formdata.append('sex', this.sex);
          formdata.append('mailKey', this.mailKey);
          new that.dfmain.Interactive({
            childPath: '/regist/',
            method: 'POST',
            detail: formdata,
            successCallback: function (result) {
              that.$refs.promptBox.displayPromptBox('注册成功');
              setTimeout(function () {
                that.$router.push('/login')
              }, 1000)

            },
            errorCallback: function (res) {
              that.$refs.promptBox.displayPromptBox(res.msg);
            },
          }).init();
        }
      },
      toRegist:function () {
        let that=this;
        if (!that.checkUserName()){
          return false;
        }
        if (!that.checkPassword()){
          return false;
        }
        if (!that.checkMail()){
          return false;
        }
        if (!that.checkName()){
          return false;
        }
        if (!that.checkMailKey()){
          return false;
        }
        $('#ToRegist').addClass('rubberBand');
        that.regist();
      },
      toLogin: function () {
        this.$router.push('/login');
      },

      backPage:function () {
        this.$router.go(-1)
      },
    },
    mounted() {
      let that = this;

      (function main() {

        $('.RegistInput').blur(function () {
          let innervalue = event.path[0].value;
          console.log(event.path[0].id);
          that.RegistFunction.DetectionAll(event.path[0].id, innervalue, true);

        })
        $('#GetEmailKey').click(function () {
          that.RegistFunction.getEmailKey.call(that.RegistFunction);
        })


      })()

    }
  }
</script>

<style scoped>
  .main {
    height: 100vh;
    background-color: #666666;
    color: white;
    overflow-x: hidden;
  }

  .head {
    margin-top: 0.4rem;
  }
  .head>div{
    font-size: 0.36rem;
  }
  .head>div:nth-child(2){
    text-align: center;
    margin-top: 0.4rem;
  }
  .head>div:nth-child(2)>img{
    width: 3.2rem;
  }
  .mainBody {
    margin-top: 0.4rem;
  }

  .registInput {
    margin-top: 0.5rem;
    border-bottom: rgba(255,255,255,0.3) solid 0.03rem;
    padding-bottom: 0.1rem;
    padding-left: 0.04rem;
    display: flex;
  }
  .registInput img {
    width: 0.65rem;
    height: 0.65rem;
    border: none;
    margin-right: 0.2rem;
  }

  .registInput input,
  .registInput select {
    display: inline;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    flex-grow: 1;
    font-size: 0.3rem;
  }

  .registInput select > option {
    background-color: #666666;
    font-size: 0.32rem;
  }

  .registInput input::-webkit-input-placeholder {
    color: white;
  }

  [name=getMailKey] {
    border: #699184 dashed 0.03rem !important;
  }

  [name=agree] {
    height: 0.3rem;
    width: 0.3rem;
    vertical-align: -0.04rem;
    border: white solid 0.03rem;
    background-color: white;
    margin-right: 0.1rem;
  }
  .toRegistShell{
    text-align: center;
  }
  #toRegist {
    background-color: #01cd9a;
    font-size: 0.38rem;
    padding-top: 0.08rem;
    padding-bottom: 0.08rem;
    margin-top: 1rem;
    border-radius: 1rem;
    width: 8rem;
  }
  .agreeShell{
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }
  .registGreen{
    font-size: 0.32rem;
    color: #01cd9a;
  }
  .rowRegist{
    display: flex;
    justify-content: space-between;
  }
  .rowRegist>div:first-child{
    width: 4rem;
  }
  .rowRegist>div:nth-child(2){
    width: 3rem;
  }
  .toLogin>a{
    font-size: 0.32rem;
    margin-top: 0.3rem;
    color: white;
  }
</style>
