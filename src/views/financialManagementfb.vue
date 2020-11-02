<template>
  <div id="fm-main" class="scroll">
    <div class="main col-sm-12">
      <div class="head col-sm-12">
        <div class="information mid-topmargin col-sm-12">
          <div class="pull-left col-sm-9">
            <h1 class="pull-left">{{name}}</h1>
            <embed class="pull-left" src="../assets/img/male.png">
          </div>
          <div class="pull-right col-sm-3"><img class="col-sm-12 img-circle" src="../assets/img/headImg.jpg"></div>
          <div class="pull-left col-sm-9 text-muted">
            <h3>用户名:{{username}}</h3>
          </div>

        </div>

        <div class="navbar navbar-default col-sm-12 navInformation">
          <ul class="nav navbar-nav col-sm-12 text-center">

            <li class="col-sm-3" v-bind:class="{'active':inMyselfInformation}">
              <a class="" href="#"
                 @touchstart="inMessage=false,inDormitory=false,inMyselfInformation=true,inFinancial=false,edit=false,choseAll=true,checkedAll(),$('#checkedAll').prop('checked',false)">个人信息</a>
            </li>
            <li class="col-sm-3" v-bind:class="{'active':inMessage}">
              <a class="" href="#"
                 @touchstart="inMessage=true,inDormitory=false,inMyselfInformation=false,inFinancial=false,edit=false,choseAll=true,checkedAll(),$('#checkedAll').prop('checked',false)">消息</a>
            </li>
            <li class="col-sm-3" v-bind:class="{'active':inDormitory}">
              <a class="" href="#"
                 @touchstart="inMessage=false,inDormitory=true,inMyselfInformation=false,inFinancial=false,edit=false,choseAll=true,checkedAll(),$('#checkedAll').prop('checked',false)">宿舍管理</a>
            </li>
            <li class="col-sm-3" v-bind:class="{'active':inFinancial}">
              <a class="" href="#"
                 @touchstart="inMessage=false,inDormitory=false,inMyselfInformation=false,inFinancial=true,edit=false,choseAll=true,checkedAll(),$('#checkedAll').prop('checked',false)">宿舍财务</a>
            </li>
          </ul>
        </div>

      </div>


      <div class="body message col-sm-12 animated" id="message"
           v-bind:class="{'bounceInRight':inMessage,'bounceOutLeft':!inMessage,'hidden':!inMessage}">
        <div class="col-sm-12">
          <h1 class="pull-left">我的消息</h1>
          <button class="pull-right btn" @click="edit=!edit"><span v-if="!edit">编辑</span><span class="cancelColor"
                                                                                               v-if="edit">取消</span>
          </button>
        </div>

        <div class="messageDetail col-sm-12" v-for="(message,index) in messages" v-bind:key="'message'+index"
             v-bind:type="message.type">
          <div v-bind:class="{'hidden':!edit}">
            <input class="chat-button-location-radio-input" type="checkbox" name="color-input-red"
                   v-bind:value="message.messageId" v-model="checkedMessage"/>
            <label v-bind:for="message.messageId"></label>
          </div>
          <div v-bind:class="{'col-sm-12':!edit,'col-sm-10':edit,'col-sm-offset-2':edit,}" v-bind:id="message.messageId"
               @click="processInformation">
            <h1>{{message.title}}</h1>
            <h3>{{message.detail}}</h3>
            <h3 class="text-muted text-right">{{message.time}}</h3>
          </div>
        </div>
      </div>

      <div class=" dormitory col-sm-12 animated "
           v-bind:class="{'bounceInRight':inDormitory,'bounceOutLeft':!inDormitory,'hidden':!inDormitory}">
        <div class="col-sm-12 dormitoryManage" data-toggle="collapse" data-target="#DormitoryInformation">
          <a class="">我的宿舍<span class="text-muted" v-bind:class="{'hidden':!dormitoryId==''}">(您还没有宿舍)</span></a>
          <span class="glyphicon glyphicon-chevron-down pull-right"></span>
        </div>
        <div class="col-sm-12 collapse in" id="DormitoryInformation">
          <div class="col-sm-12" data-toggle="modal" data-target="#changeInformationModal"
               v-bind:class="{'hidden':dormitoryId}"
               @click="modal.modalHead='修改宿舍名',modal.modalInput='宿舍名',modal.sureAim='editDormitoryName'">
            <span class="pull-left">宿舍名:</span>
            <div class="pull-right">

              <span class="text-muted ">{{dormitoryName}}</span>
              <span class="text-muted glyphicon glyphicon-chevron-right sm-leftmargin"></span>
            </div>
          </div>

          <div class="col-sm-12">
            <span class="pull-left">宿舍成员:</span><span class="text-muted pull-right">{{dormitoryMember}}</span>
          </div>

          <div class="col-sm-12">
            <span class="pull-left">宿舍身份:</span><span class="text-muted pull-right">{{dormitoryIdentity}}</span>
          </div>
        </div>


        <div class="col-sm-12 dormitoryManage" data-toggle="collapse" data-target="#DormitoryManage">
          <a class="">宿舍管理</a>
          <span class="glyphicon glyphicon-chevron-down pull-right"></span>
        </div>
        <div class="col-sm-12 collapse in changeDI" id="DormitoryManage">
          <div class="col-sm-12" data-toggle="modal" data-target="#changeInformationModal"
               @click="modal.modalHead='创建宿舍',modal.modalInput='宿舍名',modal.sureAim='createDormitory'">
            <span class="pull-left">创建宿舍</span>
            <div class="pull-right">
              <span class="text-muted glyphicon glyphicon-chevron-right sm-leftmargin"></span>
            </div>
          </div>

          <div class="col-sm-12" v-bind:class="{'hidden':dormitoryId==''}" data-toggle="modal"
               data-target="#changeInformationModal"
               @click="modal.modalHead='权限转让',modal.modalInput='用户名',modal.sureAim='transferOfAuthority'">
            <span class="pull-left">权限转让</span>
            <div class="pull-right">
              <span class="text-muted glyphicon glyphicon-chevron-right sm-leftmargin"></span>
            </div>
          </div>
          <!--v-bind:class="{'hidden':dormitoryId}"-->
          <div class="col-sm-12" data-toggle="modal" data-target="#changeInformationModal"
               v-bind:class="{'hidden':dormitoryId==''}"
               @click="modal.modalHead='邀请加入',modal.modalInput='用户名',modal.sureAim='toInvitation'">
            <span class="pull-left">邀请加入</span>
            <div class="pull-right">
              <span class="text-muted glyphicon glyphicon-chevron-right sm-leftmargin"></span>
            </div>
          </div>

        </div>


      </div>

      <div class="myselfInformation col-sm-12 animated"
           v-bind:class="{'bounceInRight':inMyselfInformation,'bounceOutLeft':!inMyselfInformation,'hidden':!inMyselfInformation}">
        <div class="col-sm-12 dormitoryManage" data-toggle="collapse" data-target="#myselfInformation">
          <a class="">我的信息</a>
          <span class="glyphicon glyphicon-chevron-down pull-right"></span>
        </div>
        <div class="col-sm-12 collapse in" id="myselfInformation">
          <div class="col-sm-12">
            <span class="pull-left">用户名</span><span class="text-muted pull-right">{{username}}</span>

          </div>

          <div class="col-sm-12">
            <span class="pull-left">姓名</span><span class="text-muted pull-right">{{name}}</span>

          </div>

          <div class="col-sm-12 verticalBottom">
            <span class="">邮箱</span>
            <div class="pull-right">
              <span class="text-muted ">{{mail}}</span>
              <span class="text-muted glyphicon glyphicon-chevron-right sm-leftmargin"></span>
            </div>


          </div>

        </div>
      </div>

      <div class="body message col-sm-12 animated" id="financial"
           v-bind:class="{'bounceInRight':inFinancial,'bounceOutLeft':!inFinancial,'hidden':!inFinancial}">
        <div class="col-sm-12">
          <h1 class="pull-left">财务管理</h1>
          <button class="pull-right btn" @click="edit=!edit"><span v-if="!edit">编辑</span><span class="cancelColor"
                                                                                               v-if="edit">取消</span>
          </button>
          <button class="pull-right btn link" @click="getDormitoryFinancialExample">下载报表样例</button>
        </div>

        <table class="col-sm-12 text-center">
          <thead>
          <tr>
            <th class="text-center" v-bind:class="{'hidden':!edit}">选中</th>
            <th class="text-center">支出/收入</th>
            <th class="text-center">条款备注</th>
            <th class="text-center" v-bind:class="{'hidden':!edit}">使用对象</th>
            <th class="text-center">时间</th>
          </tr>
          </thead>
          <tbody class="mid-topmargin">
          <tr v-for="(gal,index) in getAllFinancial" v-bind:key="'financialList'+index">
            <td v-bind:class="{'hidden':!edit}">
              <input v-bind:id="gal._id" class="chat-button-location-radio-input" v-model="checkedFinancial"
                     type="checkbox" name="color-input-red" v-bind:value="gal._id"/>
              <label v-bind:style="{}" v-bind:for="gal._id"></label>
            </td>

            <td v-bind:class="{'red':parseInt(gal.money)<0,'green':parseInt(gal.money)>0}">{{gal.money}}</td>
            <td>{{gal.notes}}</td>
            <td v-bind:class="{'hidden':!edit}">{{gal.menber}}</td>
            <td>{{gal.time}}</td>
          </tr>

          </tbody>
        </table>

        <div class="col-sm-12 nextPage text-center" @click="getFinancial">
          <span class="glyphicon glyphicon-chevron-down"></span>
        </div>


      </div>
    </div>


    <div class="foot col-sm-12">
      <div id="newLocalFinancial" class="col-sm-12"
           v-bind:class="{'hidden':!inNewLocalFinancial || !edit}">
        <div class="col-sm-6">
                    <span>
                        <input class="gate col-sm-12" type="text" placeholder="支出/收入" v-model="financial.money"/>
                        <label>支出/收入</label>
                    </span>
        </div>
        <div class="col-sm-6">
                <span>
                     <input class="gate col-sm-12" type="text" placeholder="条款备注" v-model="financial.notes"/>
                     <label>条款备注</label>
                 </span>
        </div>
        <div class="col-sm-6">
                <span>
                     <input class="gate col-sm-12" type="text" placeholder="使用对象" v-model="financial.menber"/>
                     <label>使用对象</label>
                 </span>
        </div>
        <div class="col-sm-6" @click="choseDate">
                <span>
                     <input class="gate col-sm-12"  type="text" placeholder="时间" disabled="disabled" v-model="financial.time"/>
                     <label>时间</label>
                 </span>
        </div>
      </div>

      <div class="col-sm-12 edit " v-bind:class="{'hidden':!edit}">
        <div v-bind:class="{'col-sm-2':edit,'hidden':!edit}" class="pull-left">
          <input id="checkedAll" class="chat-button-location-radio-input" type="checkbox" name="color-input-red"
                 value="#f0544d"/>
          <label for="checkedAll" @touchstart="checkedAll"></label>
        </div>
        <div class="pull-left">全选</div>

        <!--<button class="pull-right btn delete" v-bind:class="{'hidden':!edit||!inMessage}" @click="">删除</button>-->
        <button class="pull-right btn delete" v-bind:class="{'hidden':!edit||!inFinancial}" @click="deleteFinancial">
          删除
        </button>
        <button v-bind:class="{'hidden':!edit||!inFinancial}" class="pull-right btn success"
                @click="inNewLocalFinancial=!inNewLocalFinancial">
          <span v-bind:class="{'hidden':inNewLocalFinancial}">新增</span>
          <span v-bind:class="{'hidden':!inNewLocalFinancial}" @click="addFinancial">确定</span>
        </button>

        <button v-bind:class="{'hidden':!edit||!inFinancial}" class="pull-right btn success"
                @click="choseExcel=!choseExcel">
          <span v-bind:class="{'hidden':choseExcel} " @click="$('#batchUpload').click()">导入报表</span>
          <span v-bind:class="{'hidden':!choseExcel}" @click="batchUpload">确定导入</span>
        </button>

      </div>

      <div class="modal fade col-sm-10 col-sm-offset-1" id="changeInformationModal" tabindex="-1" role="dialog"
           aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="col-sm-12">
          <div class="modal-content col-sm-12">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabel">{{modal.modalHead}}</h4>
            </div>
            <div class="modal-body col-sm-12">
              <span class="pull-left">{{modal.modalInput}}:</span>
              <input class="col-sm-8 pull-left" type="text" v-model="modal.modalInputValue">
            </div>
            <div class="modal-footer col-sm-12">
              <button class="btn btn-default" data-dismiss="modal">关闭</button>
              <button class="btn btn-primary" v-on:touchstart="branchExecution">确定</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal -->
      </div>

      <div class="modal fade col-sm-10 col-sm-offset-1" id="processInformation" tabindex="-1" role="dialog"
           aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="col-sm-12">
          <div class="modal-content col-sm-12">
            <div class="modal-header col-sm-12">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title">消息处理</h4>
            </div>
            <div class="modal-body col-sm-12">
              <div class="col-sm-12">
                <h1>{{processInformations.title}}</h1>
                <h3>{{processInformations.detail}}</h3>
                <h3 class="text-muted text-right">{{processInformations.time}}</h3>
              </div>
            </div>
            <div class="modal-footer col-sm-12">
              <div class="">
                <button class="btn btn-default col-sm-4 col-sm-offset-1" data-dismiss="modal" @click="confirmRefuse">
                  拒绝
                </button>
              </div>

              <div>
                <button class="btn btn-primary col-sm-4 col-sm-offset-2" v-on:click="confirmAccession">同意</button>
              </div>

            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal -->
      </div>

      <div class="hidden">
        <input type="file" id="batchUpload" @change="choseFile"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "financialManagement",
    data: function () {
      return {
        edit: false,
        modal: {
          modalHead: '',
          modalInput: '',
          sureAim: '',
          modalInputValue: '',
        },
        processInformations: {
          title: '',
          detail: '',
          time: '',
          messageId: '',
        },
        financial: {
          money: '',
          time: '',
          notes: '',
          menber: '',
        },
        getAllFinancial: [],
        username: 'LaLaLa',
        name: '夏浩',
        title: '啦啦啦啦啦',
        detail: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或',
        time: '2017/12/19',
        dormitoryName: '',
        dormitoryMember: '',
        dormitoryIdentity: '',
        mail: '471087639@qq.com',
        sex: 'male',
        headImg: '',
        dormitoryId: '',
        messages: [],
        checkedFinancial: [],
        checkedMessage: [],
        file: {},

        page: 0,
        inMessage: false,
        inDormitory: false,
        inMyselfInformation: false,
        inFinancial: true,
        inNewLocalFinancial: false,
        choseAll: false,
        choseExcel: false,
      }
    },

    methods: {
      branchExecution: function () {
        console.log('a', this.modal.sureAim);
        this.modal.sureAim ? this[this.modal.sureAim](this.modal.modalInputValue) : void (0);
      },
      getMyselfInformation: function () {
        let that = this;
        let formdata = new FormData();
        // formdata.append('username',this.username);
        // formdata.append('password',this.password);
        new that.dfmain.Interactive({
          childPath: '/informationManagement/getMyselfInformation',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.name = result.msg.name;
            that.username = result.msg.username;
            that.sex = result.msg.sex;
            that.mail = result.msg.mail;
            result.msg.img ? that.headImg = result.msg.img : void (0);
            if (result.msg.dormitoryId) {
              that.dormitoryId = result.msg.dormitoryId;
              that.dormitoryIdentity = result.msg.dormitoryIdentity;
              that.dormitoryMember = result.msg.dormitoryMemberName.join(',');
            }

          },
          errorCallback: function () {

          },
        }).init();
      },

      createDormitory: function (needDormitoryName) {
        let that = this;
        let formdata = new FormData();
        formdata.append('dormitoryName', needDormitoryName);
        // formdata.append('password',this.password);
        new that.dfmain.Interactive({
          childPath: '/informationManagement/createDormitory',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('创建宿舍' + needDormitoryName + '成功');
            that.dormitoryName = needDormitoryName;
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',创建宿舍' + that.dormitoryName + '失败,请重试');
          },
        }).init();
      },
      toInvitation: function (username) {
        let that = this;
        let formdata = new FormData();
        formdata.append('aimName', username);
        // formdata.append('password',this.password);
        new that.dfmain.Interactive({
          childPath: '/informationManagement/invitationToJoin',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('成功对' + username + '发出邀请');
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',邀请失败,请重试');
          },
        }).init();
      },
      transferOfAuthority: function (username) {
        let that = this;
        let formdata = new FormData();
        formdata.append('aimName', username);
        // formdata.append('password',this.password);
        new that.dfmain.Interactive({
          childPath: '/informationManagement/transferOfAuthority',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('成功将权限转让给了' + username);
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',权限转让失败,请重试');
          },
        }).init();
      },
      editDormitoryName: function (needDormitoryName) {
        let that = this;
        let formdata = new FormData();
        formdata.append('dormitoryName', needDormitoryName);
        // formdata.append('password',this.password);
        new that.dfmain.Interactive({
          childPath: '/informationManagement/createDormitory',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('创建宿舍' + needDormitoryName + '成功');
            that.dormitoryName = needDormitoryName;
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',创建宿舍' + that.dormitoryName + '失败,请重试');
          },
        }).init();
      },
      getMyselfPower: function () {
        let that = this;
        let formdata = new FormData();
        // formdata.append('username',this.username);
        // formdata.append('password',this.password);
        new that.dfmain.Interactive({
          childPath: '/informationManagement/getMyselfInformation',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.name = result.msg.name;
            that.username = result.msg.username;
            that.sex = result.msg.sex;
            that.mail = result.msg.mail;
            result.msg.img ? that.headImg = result.msg.img : void (0);
            result.msg.dormitoryId ? that.dormitoryId = result.msg.dormitoryId : void (0);


          },
          errorCallback: function () {

          },
        }).init();
      },

      getMyselfMessage: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('password', this.password);

        new that.dfmain.Interactive({
          childPath: '/myselfManagement/getMessage',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.messages = result.message;
            for (let i = 0; i < that.messages.length; i++) {
              that.messages[i].time = that.convertToTime(that.messages[i].messageId);
            }

          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + '个人消息查询失败,请重试');
          },
        }).init();
      },
      processInformation: function (event) {
        console.log(this);
        let that = this;
        let target;
        if (!that.edit) {
          console.log($(event.target));
          $(event.target).attr('nodeName') == 'DIV' ? target = $(event.target) : target = $(event.target).parent();
          that.processInformations.messageId = target.attr('id');
          console.log(that.processInformations)
          that.processInformations = (function () {
            for (let i of that.messages) {
              if (i.messageId == that.processInformations.messageId) {
                return i;
              }
            }
          })()

          that.processInformations.type == 'invitation' ? $('#processInformation').modal('show') : void(0);
        }
      },
      confirmAccession: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('messageId', that.processInformations.messageId);
        formdata.append('dormitoryId', that.processInformations.inviteDormitoryId);
        new that.dfmain.Interactive({
          childPath: '/myselfManagement/confirmAccession',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('成功加入了该宿舍');
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + '加入宿舍失败,请重试');
          },
        }).init();
      },
      confirmRefuse: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('messageId', that.processInformations.mssageId);
        formdata.append('dormitoryId', that.processInformations.inviteDormitoryId);
        new that.dfmain.Interactive({
          childPath: '/myselfManagement/confirmRefuse',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('已拒绝加入该宿舍');

          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + '个人消息查询失败,请重试');
          },
        }).init();
      },

      addFinancial: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('money', this.financial.money);
        formdata.append('time', this.financial.time);
        formdata.append('menber', this.financial.menber);
        formdata.append('notes', this.financial.notes);
        new that.dfmain.Interactive({
          childPath: '/financialManagement/addDormitoryCost',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('添加成功');
            setTimeout(function () {
              window.location.href = '../myselfInformation/'
            }, 1000)
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',权限转让失败,请重试');
          },
        }).init();
      },
      getFinancial: function () {
        let that = this;
        that.page++;
        let formdata = new FormData();
        formdata.append('page', that.page)
        new that.dfmain.Interactive({
          childPath: '/financialManagement/getDormitoryCost',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            for (let i of result.msg) {
              that.getAllFinancial.push(i);
            }


          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',权限转让失败,请重试');
          },
        }).init();
      },
      deleteFinancial: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('dormitoryCostId', this.checkedFinancial);
        new that.dfmain.Interactive({
          childPath: '/financialManagement/deleteDormitoryCost',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('删除成功');
            setTimeout(function () {
              window.location.href = '../myselfInformation/'
            }, 1000)
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',删除失败,请重试');
          },
        }).init();
      },
      batchUpload: function () {
        that.dfmain.PromptBox.displayPromptBox('开始上传请等待');
        let that = this;
        let formdata = new FormData();
        formdata.append('file', that.file);
        new that.dfmain.Interactive({
          childPath: '/financialManagement/batchUpload',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('批量导入成功');
            setTimeout(function () {
              window.location.href = '../myselfInformation/'
            }, 1000)
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',权限转让失败,请重试');
          },
        }).init();
      },
      getDormitoryFinancialExample: function () {
        window.open(URL + '/financialManagement/getDormitoryFinancialExampleFile');
      },


      convertToTime: function (objectId) {
        let bytes = [];
        for (let i = 0; i < 4; i++) {
          bytes[i] = parseInt(objectId.substring(i * 2, i * 2 + 2), 16);
        }
        let int = (((bytes[0]) << 24) |
          ((bytes[1] & 0xff) << 16) |
          ((bytes[2] & 0xff) << 8) |
          ((bytes[3] & 0xff))); //位移操作 加上括号；
        let times = int * 1000; //创建时间的 毫秒数  自己就可以转化了
        let date = new Date(times).toLocaleString('chinese', {hour12: false})
        return date;
      },
      checkedAll: function (event) {
        this.choseAll = !this.choseAll;
        console.log(this.choseAll)
        if (this.inFinancial) {
          if (this.choseAll) {
            for (let i of this.getAllFinancial) {
              this.checkedFinancial.push(i._id);
            }
          } else {
            this.checkedFinancial = [];
          }
        } else {
          if (this.choseAll) {
            for (let i of this.messages) {
              this.checkedMessage.push(i.messageId);
            }
          } else {
            this.checkedMessage = [];
          }

        }

      },
      choseFile: function (event) {
        let file = event.target.files[0];
        this.file = file;
        console.log(this.file);
      },
      choseDate:function () {
        let that=this;
        that.$weui.datePicker({
          start: new Date(new Date().getTime()-31536000000),
          end: new Date(),
          defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
          onConfirm: function(result){
            // 二级调用：时间
            console.log(result);
          },
          id: 'ma_expect_date',
          className: 'ma_expect_date_picker'
        });
      }
    },
    mounted: function () {
      this.getMyselfInformation();
      // this.getMyselfMessage();
      this.getFinancial();
    },
  }
</script>

<style scoped>
  #fm-main {
    background-color: rgb(247, 245, 246);
    min-height: 100vh;
  }

  .modal-backdrop {
    position: absolute !important;
    display: none;
  }

  .modal:before {
    content: '';
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  .head,
  .body,
  .foot,
  .dormitory > div,
  .myselfInformation > div {
    background-color: white;
    font-size: 0.35rem;
  }

  .body {
    margin-top: 0.6rem;
  }

  .main {
    padding: 0;
  }

  .foot {
    position: fixed;
    bottom: 0;
  }

  .information h1 {
    font-size: 0.8rem;
    margin: 0;
  }

  .information h3 {
    font-size: 0.3rem;
  }

  .information embed {
    width: 0.5rem;
    height: 0.5rem;
    vertical-align: bottom;
    margin-left: 0.2rem;
    display: inline;
    margin-top: 0.2rem;

  }

  .navInformation {
    background-color: white;
    margin-top: 0.7rem;
    padding: 0;
    border-left: none;
    border-right: none;
    font-size: 0.35rem;
  }

  .navInformation li {
    padding: 8px;
  }

  .active > a {
    color: #67b168 !important;
    background-color: white !important;
    border-bottom: #67b168 solid 2px;
  }

  .message > div {
    border-bottom: rgba(0, 0, 0, 0.2) 2px solid;
  }

  .message > div:first-child > button,
  .delete,
  .success,
  .sure,
  .cancel,
  .link {
    background-color: rgba(0, 0, 0, 0);
    color: #67b168;
    font-size: 32px;
    border: none;
    margin-top: 10px;
  }

  .delete {
    color: rgba(255, 0, 0, 0.48);
    font-size: 36px;
  }

  .red {
    color: rgba(255, 0, 0, 0.48);
  }

  .green {
    color: rgba(82, 184, 19, 0.48);
  }

  .success {
    color: rgba(82, 184, 19, 0.48);
    font-size: 36px;
    margin-right: 30px;
  }

  .link {
    color: rgba(35, 183, 229, 0.9) !important;
    font-size: 36px;
    margin-right: 30px;
  }

  .sure {
    color: #67b168;
    font-size: 36px;
    margin-left: 30px;
  }

  .cancel {
    color: #e5e5e5;
    font-size: 36px;
  }

  .cancelColor {
    color: #e5e5e5;
  }

  .delete:checked {
    color: rgba(255, 0, 0, 0.48);
  }

  .message > div:last-child {
    border: none;
  }

  .messageDetail {
    padding-top: 10px;
  }

  .messageDetail > div:first-child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .messageDetail h1 {
    font-size: 35px;

  }

  .messageDetail h3 {
    font-size: 32px;

  }

  .dormitory,
  .myselfInformation {
    padding: 0;
    margin-top: 30px;
  }

  .dormitory > div,
  .myselfInformation > div {
    padding: 20px 30px;
  }

  .dormitoryManage:nth-of-type(1),
  .myselfInformation > div:first-child {
    margin-top: 5px;
  }

  .dormitoryManage,
  .myselfInformation > div:first-child {
    padding: 15px;
    border-bottom: rgba(0, 0, 0, 0.2) solid 2px;
    margin-top: 20px;
  }

  .nextPage > span {
    color: rgba(0, 0, 0, 0.4);
    font-size: 42px;
  }

  #DormitoryInformation > div,
  #DormitoryManage > div,
  #myselfInformation > div,
  #financial > div {
    border-bottom: rgba(0, 0, 0, 0.15) solid 1px;
    padding: 15px;
  }

  #financial {
    margin-bottom: 100px;
  }

  #financial th {
    padding: 15px 0;
  }

  #financial tbody > tr > td {
    padding: 10px 0;
  }

  #financial table {
    padding: 0;
  }

  #financial thead {
    border-bottom: rgba(0, 0, 0, 0.15) solid 1px;
  }

  .edit {
    height: 110px;
    padding-top: 20px;

  }

  .edit > div {
    margin-top: 17px;
    padding-left: 0;
  }

  #newLocalFinancial {
    border-top: rgba(0, 0, 0, 0.15) solid 1px;
    position: absolute;
    top: 0;
    background-color: white;
    width: 100vw;
    left: 0;
    transform: translateY(-100%);
    padding-bottom: 1.4rem;
  }

  #changeInformationModal .modal-body > input {
    border: none;
  }

  #changeInformationModal .modal-content h4,
  #processInformation .modal-content h4 {
    font-size: 43px;
  }

  #changeInformationModal .modal-body,
  #processInformation .modal-body {
    border-bottom: #67b168 solid 2px;
  }

  #changeInformationModal .modal-body span,
  #processInformation .modal-body span {
    font-size: 35px;
    vertical-align: bottom;
  }

  #changeInformationModal,
  #processInformation {
    position: fixed;
    height: 300px;
    top: 200px;
  }

  #processInformation {
    height: 400px;
  }

  /*__________________________________________________________________________________________*/
  /*lable标签的大小、位置、背景颜色更改，在css选择时，“+”代表相邻元素，即当前元素的下一元素*/
  [type=checkbox] {
    display: none;
  }

  [type=checkbox] + label {
    display: block;
    width: 50px;
    height: 50px;
    cursor: pointer;
    position: relative;
    top: 2px;
    left: 15px;
    background: rgba(0, 0, 0, 0);
    border: #67b168 solid 2px;
    border-radius: 40px;
    overflow: hidden;
  }

  /*当input框为选中状态时，lable标签的样式，其中在css选择时，“：”表示当前input框的值，即checked；
        该部分主要对显示的“对号”的大限居中方式，显示颜色进行了设置*/
  [type=checkbox]:checked + label::before {
    display: block;
    content: "\2714";
    text-align: center;
    font-size: 38px;
    color: white;
    background: #67b168;
  }

  [type=checkbox] + label + div {
    vertical-align: middle;
    display: inline;
  }


</style>
