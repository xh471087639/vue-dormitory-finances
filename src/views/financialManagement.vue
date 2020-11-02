<template>
  <div class="fm-main">
    <div class="mainHead">
      <div class="headLeft">
        <div>
          <div class="name">{{userInf.name}}</div>
          <div class="sexIcon">
            <img
              v-bind:src="userInf.sex==='male'?require('../assets/img/male.png'):require('../assets/img/female.png')"/>
          </div>
        </div>
        <div class="userName">用户名：{{userInf.userName}}</div>
      </div>
      <div class="headImg">
        <img v-bind:src="userInf.headImgUrl"/>
      </div>
    </div>
    <div class="choseFunction">
      <div class="choseShell">
        <div class="choseBtn"
             v-for="(item,index) in activeFunction.name"
             v-show="activeFunction.canUse[index]"
             v-bind:key="item"
             v-bind:class="{'functionActive':index===activeFunction.index}"
             @touchstart="activeFunction.index=index">{{item}}
        </div>
      </div>
    </div>
    <div class="allFunction"
         v-bind:style="{'width':getAllFunctionWidth,'transform':getSlideXPX}">
      <div v-show="activeFunction.canUse[0]" @touchstart="startXDrag" @touchmove="draggXing" @touchend="dragXend">
        <normalFunction v-on:toEdit="toEditInf" v-bind:function-list="getMyInfFun"></normalFunction>
      </div>
      <div v-show="activeFunction.canUse[1]" @touchstart="startXDrag" @touchmove="draggXing" @touchend="dragXend">
        <div class="messageShell">
          <div class="messageHead">
            <div>我的消息</div>
            <div class="financialEdit" @click="messages.edit=!messages.edit"
                 v-bind:style="{'color':messages.edit?'rgba(255, 0, 0, 0.48)':'#67b168'}">{{messages.edit?'取消':'编辑'}}
            </div>
          </div>

          <div class="messageBody" v-for="(message,index) in messages.detail" v-bind:key="message._id"
               v-bind:type="message.type">
            <div class="msgCheck" v-show="messages.edit">
              <input class="chat-button-location-radio-input" type="checkbox" name="color-input-red"
                     v-bind:value="message._id" v-model="message.beChoseId" v-bind:id="message._id"/>
              <label v-bind:for="message._id"></label>
            </div>
            <div class="messageDetail" v-bind:id="message.messageId"
                 @click="processInformation">
              <div class="msgDetHead">
                <div class="msgDetTitle">{{message.title}}</div>
                <div class="text-muted text-right msgDetTime">{{message.time}}</div>
              </div>
              <div class="msgDetBody">
                <div class="msgDetBodyText">{{message.detail}}</div>
                <button class="dealMsg" @click="dealMsg(index)">处理</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div v-show="activeFunction.canUse[2]" @touchstart="startXDrag" @touchmove="draggXing" @touchend="dragXend">
        <normalFunction v-on:toEdit="toEditInf" v-bind:function-list="getDormitoryFun"></normalFunction>
      </div>
      <div v-show="activeFunction.canUse[3]" class="financialPart">
        <div class="financialSummary">
          <div class="summaryHead">
            <div>财务总汇</div>
            <img class="foldIcon" @click="financialSummary.fold=!financialSummary.fold"
                 v-bind:class="{'routeArrow':financialSummary.fold}" src="../assets/img/arrowDown.png"/>
          </div>
          <div class="summaryBody" v-bind:style="{'max-height':financialSummary.fold?'0vh':'30vh'}">
            <div v-for="item in financialSummary.menberBalance" v-bind:key="item.name">
              <div class="summaryName">{{item.name+':'}}</div>
              <div class="summaryMoney" v-bind:style="{'color':item.balance>0?'#67b168':'rgba(255, 0, 0, 0.48)'}">
                {{item.balance.toFixed(2)}}
              </div>
            </div>
            <div>
              <div class="summaryName">总额:</div>
              <div class="summaryMoney"
                   v-bind:style="{'color':financialSummary.dormitoryBalance>0?'#67b168':'rgba(255, 0, 0, 0.48)'}">
                {{financialSummary.dormitoryBalance.toFixed(2)}}
              </div>
            </div>
          </div>

        </div>
        <div class="financialMain">
          <div class="financialHead">
            <div>财务管理</div>
            <div
              @click="financialManage.downloadIndex<financialManage.downloadType.length-1?financialManage.downloadIndex++:financialManage.downloadIndex=0">
              <img class="changeDownloadType" src="../assets/img/change.png"/></div>
            <div class="downloadSimple" @click="getDormitoryFinancialExcel">
              {{financialManage.downloadText[financialManage.downloadIndex]}}
            </div>
            <div class="financialEdit" @click="financialManage.edit=!financialManage.edit">
              {{financialManage.edit?'完成':'编辑'}}
            </div>
          </div>
          <div class="financialBody">
            <div class="financialTable">
              <table @touchstart="startYDrag" @touchmove="draggYing" @touchend="dragYend">
                <thead>
                <tr>
                  <th v-show="financialManage.edit">选中</th>
                  <th>支出/收入</th>
                  <th>条款备注</th>
                  <th v-show="financialManage.edit">使用对象</th>
                  <th>时间</th>
                </tr>
                </thead>
                <tbody v-bind:style="{'transform':getSlideYPX}">
                <tr v-for="item in financialManage.detail" v-bind:key="item.id">
                  <td v-show="financialManage.edit">
                    <input v-bind:id="item._id" class="chat-button-location-radio-input"
                           type="checkbox" name="color-input-red" v-bind:value="item._id"
                           v-model="financialManage.beChoseId"
                           v-bind:checked="financialManage.beChoseId.indexOf(item._id)!=-1"/>
                    <label v-bind:style="{}" v-bind:for="item._id"></label>
                  </td>
                  <td v-bind:style="{'color':item.money<0?'rgba(255,0,0,0.48)':'rgba(82,184,19,0.48)'}">{{item.money}}
                  </td>
                  <td v-bind:style="{'max-width':financialManage.edit?'20vh':'40vh'}">{{item.notes}}</td>
                  <td v-show="financialManage.edit">{{item.menber}}</td>
                  <td>{{item.time}}</td>
                </tr>
                </tbody>
              </table>

            </div>

            <div class="loadMore weui-loadmore" v-bind:style="{'transform':getSlideYPX}">
              <i class="weui-loading"></i>
              <span class="weui-loadmore__tips">正在加载</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="up-to-in">
      <div class="editShell" key="editFunction" v-show="financialManage.edit && activeFunction.index===3">
        <div class="editFunction">
          <div class="choseAll" @touchstart="choseAll">
            <input id="choseAllFinancial" class="chat-button-location-radio-input"
                   type="checkbox" name="color-input-red"
                   v-bind:checked="this.financialManage.beChoseId.length===this.financialManage.detail.length&&this.financialManage.beChoseId.length!=0"/>
            <label v-bind:style="{}"></label>
            <div>全选</div>
          </div>
          <div class="importTable" v-bind:class="{'hidden':!financialManage.edit}">
            <span v-bind:class="{'hidden':financialManage.choseExcel} " @click="choseFile">导入报表</span>
            <span v-bind:class="{'hidden':!financialManage.choseExcel}" @click="batchUpload">确定导入</span>
          </div>
          <div class="newDetail" @click="financialManage.add?sureAdd():financialManage.add=!financialManage.add">
            {{financialManage.add?'确定':'新增'}}
          </div>
          <div class="deleteDetail" @click="deleteFinancial">删除</div>
        </div>

        <transition name="add-up-to-in">
          <div class="addDetail" v-show="financialManage.add&&financialManage.edit" key="addDetail">
            <div class="addMoney ">
              <input type="number" v-model="financialManage.addDetail.money"/>
              <label>支出/收入</label>
            </div>
            <div class="addMenber " @click="financialManage.addDetail.openChoseMember=true">
              <input disabled="disabled" type="text" v-model="financialManage.addDetail.menber"/>
              <label>使用对象</label>
            </div>
            <div class="addNotes ">
              <input type="text" v-model="financialManage.addDetail.notes"/>
              <label>条款备注</label>
            </div>
            <div class="addTime " @click="choseDate">
              <input disabled="disabled" type="text" v-model="financialManage.addDetail.time" />
              <label>时间</label>
            </div>
          </div>
        </transition>

      </div>
    </transition>
    <transition name="up-to-in">
      <div class="editShell" key="editMsg" v-show="messages.edit && activeFunction.index===1">
        <div class="editFunction">
          <div class="choseAll" @touchstart="choseAll">
            <input id="choseAllMsg" class="chat-button-location-radio-input"
                   type="checkbox" name="color-input-red"
                   v-bind:checked="this.messages.beChoseId.length===this.messages.detail.length&&this.messages.beChoseId.length!=0"/>
            <label v-bind:style="{}"></label>
            <div>全选</div>
          </div>
          <div class="deleteDetail" @click="deleteFinancial">删除</div>
        </div>

        <transition name="add-up-to-in">
          <div class="addDetail" v-show="financialManage.add&&financialManage.edit" key="addDetail">
            <div class="addMoney ">
              <input type="number" v-model="financialManage.addDetail.money"/>
              <label>支出/收入</label>
            </div>
            <div class="addMenber " @touchstart="choseAim">
              <input disabled="disabled" type="text" v-model="financialManage.addDetail.menber"/>
              <label>使用对象</label>
            </div>
            <div class="addNotes ">
              <input type="text" v-model="financialManage.addDetail.notes"/>
              <label>条款备注</label>
            </div>
            <div class="addTime " @touchstart="choseDate">
              <input disabled="disabled" type="text" v-model="financialManage.addDetail.time"/>
              <label>时间</label>
            </div>
          </div>
        </transition>

      </div>
    </transition>
    <promptBox ref="promptBox"></promptBox>
    <div class="hidden">
      <input type="file" id="batchUpload" @change="upFile"
             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    </div>
    <editInf ref="edit-inf" v-bind:editData="editData.initData"></editInf>
    <div id="dialogs" v-show="financialManage.addDetail.openChoseMember">
      <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
        <div class="weui-mask" @click="financialManage.addDetail.openChoseMember=false"></div>
        <div id="js_dialog_1" class="weui-half-screen-dialog weui-half-screen-dialog_show">
          <div class="weui-half-screen-dialog__hd">
            <div class="weui-half-screen-dialog__hd__side">
              <button class="weui-icon-btn" @click="financialManage.addDetail.openChoseMember=false">关闭<i
                class="weui-icon-close-thin"></i></button>
            </div>
            <div class="weui-half-screen-dialog__hd__main">
              <strong class="weui-half-screen-dialog__title">选择成员</strong>
            </div>
          </div>
          <div class="weui-half-screen-dialog__bd">
            <div class="choseMember">
              <div class="memberList"
                   v-for="item in dormitoryInf.dormitoryMember.split(',')"
                   v-bind:class="{'beChoseMember':financialManage.addDetail.menber.split(',').indexOf(item)!=-1 || financialManage.addDetail.menber==='所有成员'}"
                   @touchstart="memberOption(item)"
                   v-bind:key="item">{{item}}
              </div>
            </div>
            <div class="choseMember">
              <div class="memberList"
                   v-bind:class="{'beChoseMember':financialManage.addDetail.menber==='所有成员'}"
                   @touchstart="memberOption('所有成员')">所有成员
              </div>
            </div>
            <div class="sureMember">
              <button class="weui-btn weui-btn_primary" @click="financialManage.addDetail.openChoseMember=false">确定</button>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import normalFunction from '../components/normalFunction'
  import promptBox from '../components/promptBox'
  import editInf from '../components/editInf'

  export default {
    name: "financialManagement",
    data: function () {
      return {
        userInf: {
          userId: '',
          name: '',
          userName: '',
          headImgUrl: require('../assets/img/headImg.jpg'),
          sex: '',
          mail: ''
        },
        activeFunction: {
          index: 3,
          name: ['个人信息', '消息', '宿舍管理', '宿舍财务'],
          canUse: [true, true, true, true],
        },
        dormitoryInf: {
          dormitoryId: '',
          dormitoryName: '',
          dormitoryMember: '',
          dormitoryIdentity: '',
        },
        financialManage: {
          pageNum: 10,
          page: 1,
          detail: [],
          edit: false,
          beChoseId: [],
          add: false,
          addDetail: {
            money: '',
            notes: '',
            menber: '所有成员',
            time: '',
            openChoseMember: false,
          },
          choseExcel: false,
          file: '',
          downloadText: ['下载报表样例', '下载数据表'],
          downloadType: ['simpleExcel', 'dataExcel'],
          downloadIndex: 0,
        },
        statusChange: {
          dragYRatio: 10,
          dragXRatio: 1,
          loadMoreSize: 30,
          dragStartX: 0,
          dragStartY: 0,
          nowX: 0,
          nowY: 0,
        },
        editData: {
          name: ['创建宿舍', '权限转让', '邀请加入'],
          key: ['dormitoryName', 'aimName', 'aimName'],
          url: ['/informationManagement/createDormitory', '/informationManagement/transferOfAuthority', '/informationManagement/invitationToJoin'],
          keyDetail: ['宿舍名', '用户名(非姓名)', '用户名(非姓名)'],
          initData: {
            name: '',
            keyValue: '',
            url: '',
            nameKey: '',
          }
        },
        financialSummary: {
          dormitoryBalance: 0,
          menberBalance: [],
          fold: false,
          //数据格式
          // dormitoryBalance:0,
          // menberBalance:[{
          //   name:'',
          //   balance:0
          // }],
        },
        messages: {
          edit: false,
          type: ["normal", "invitation", "request", "processed"],
          beChoseId: [],
          detail: [],
          // detail: [{
          //   type: 'invitation',
          //   title: '您收到一则邀请',
          //   detail: 'LaLaLa邀请您加入皮皮蟹',
          //   inviteDormitoryId: '5dfcb935f2e3e45a6849fa62',
          //   messageId: '5f65a05a6d4b3b14fac56c1c',
          //   _id: '5f65a13a6d4b3b14fac56c22',
          //   time:'2020/09/19'
          // }]
        }
      }
    },
    components: {
      normalFunction,
      promptBox,
      editInf
    },
    computed: {
      getMyInfFun: function () {
        return [{
          name: '我的信息',
          childList: [{
            name: '用户名',
            value: this.userInf.userName,
            canChange: false,
          }, {
            name: '姓名',
            value: this.userInf.name,
            canChange: true,
          }, {
            name: '邮箱',
            value: this.userInf.mail,
            canChange: true,
          }],
          canUse: true,
        }]
      },
      getDormitoryFun: function () {

        return [{
          name: '我的宿舍',
          childList: [{
            name: '宿舍成员',
            value: this.dormitoryInf.dormitoryMember,
            canChange: false,
          }, {
            name: '宿舍身份',
            value: this.dormitoryInf.dormitoryIdentity,
            canChange: false,
          }]
        }, {
          name: '宿舍管理',
          childList: [{
            name: '创建宿舍',
            value: '',
            canChange: true,
          }, {
            name: '权限转让',
            value: '',
            canChange: true,
          }, {
            name: '邀请加入',
            value: '',
            canChange: true,
          }],
          canUse: true,
        },]
      },
      getSlideYPX: function () {
        return ' translateY(' + -1 * (this.statusChange.dragStartY - this.statusChange.nowY) / this.statusChange.dragYRatio + 'px)'
      },
      getSlideXPX: function () {
        // return 'translateX(' +(this.activeFunction.index*-1*window.screen.width)/10+ (-1 * (this.statusChange.dragStartX - this.statusChange.nowX) / this.statusChange.dragXRatio) + 'px)'
        let headX = this.activeFunction.index * -1 * window.screen.width;
        let endX = (this.statusChange.dragStartX - this.statusChange.nowX) / this.statusChange.dragXRatio;
        return 'translateX(' + (headX - endX) + 'px)'
      },
      getAllFunctionWidth: function () {
        let len = 0;
        for (let i of this.activeFunction.canUse) {
          i ? len += 100 : void(0);
        }
        return len + 'vw';
      }
    },

    methods: {
      choseAll: function () {
        if (this.financialManage.beChoseId.length === this.financialManage.detail.length) {
          this.financialManage.beChoseId = [];
        } else {
          let all = [];
          for (let i of this.financialManage.detail) {
            all.push(i._id);
          }
          this.financialManage.beChoseId = all;
        }
        console.log(this.financialManage.beChoseId, 1);

      },
      getMyselfInformation: function () {
        let that = this;
        let formdata = new FormData();
        // formdata.append('username',this.username);
        // formdata.append('password',this.password);
        let loading = that.$weui.loading('获取用户信息...');
        new that.dfmain.Interactive({
          childPath: '/informationManagement/getMyselfInformation',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            loading.hide();
            that.userInf.name = result.msg.name;
            that.userInf.userName = result.msg.username;
            that.userInf.sex = result.msg.sex;
            that.userInf.mail = result.msg.mail;
            result.msg.img ? that.userInf.headImg = result.msg.img : void (0);
            if (result.msg.dormitoryId) {
              that.dormitoryInf.dormitoryId = result.msg.dormitoryId;
              that.dormitoryInf.dormitoryIdentity = result.msg.dormitoryIdentity;
              that.dormitoryInf.dormitoryMember = result.msg.dormitoryMemberName.join(',');
            } else {
              that.activeFunction.index = 0;
            }

          },
          errorCallback: function () {
            loading.hide();
          },
        }).init();
      },
      getFinancial: function (needPage) {
        let that = this;
        let page = 1;
        needPage ? page = needPage : page = that.financialManage.page;
        let formdata = new FormData();
        formdata.append('page', page)
        let loading = that.$weui.loading('加载中...');
        new that.dfmain.Interactive({
          childPath: '/financialManagement/getDormitoryCost',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            loading.hide();
            if (result.msg[0] || needPage) {
              let headArray = that.financialManage.detail.slice(0, (page - 1) * that.financialManage.pageNum);
              let endArray = that.financialManage.detail.slice((page + 1) * that.financialManage.pageNum);
              that.financialManage.detail = headArray.concat(result.msg, endArray)
              that.financialManage.page += 1;
            } else {
              if (page == 1) {
                that.$refs.promptBox.displayPromptBox('暂时还没有记录哦~');
              } else {
                that.$refs.promptBox.displayPromptBox('已经没有更多啦~');

              }
            }

          },
          errorCallback: function (result) {
            loading.hide();
            // that.$weui.toast('')
            that.$set(that.activeFunction.canUse, 3, false);

            if (result.status != '203') {
              that.$refs.promptBox.displayPromptBox(result.msg);
            }
          },
        }).init();
      },
      getDormitoryFinancialExcel: function () {
        switch (this.financialManage.downloadType[this.financialManage.downloadIndex]) {
          case 'simpleExcel':
            window.open(this.URL + '/financialManagement/getDormitoryFinancialExampleFile');
            break;
          case 'dataExcel':
            window.open(this.URL + '/financialManagement/getDormitoryFinancialExampleFile');
            break;
          default:
            window.open(this.URL + '/financialManagement/getDormitoryFinancialExampleFile');
            break;
        }
      },
      addFinancial: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('money', this.financial.money);
        formdata.append('time', this.financial.time);
        formdata.append('menber', this.financial.menber);
        formdata.append('notes', this.financial.notes);
        let loading = that.$weui.loading('添加中...');
        new that.dfmain.Interactive({
          childPath: '/financialManagement/addDormitoryCost',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            loading.hide();
            that.dfmain.PromptBox.displayPromptBox('添加成功');

          },
          errorCallback: function (result) {
            loading.hide()
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',权限转让失败,请重试');
          },
        }).init();
      },
      deleteFinancial: function () {
        let that = this;
        let formdata = new FormData();
        formdata.append('dormitoryCostId', this.financialManage.beChoseId);
        let loading = that.$weui.loading('删除中...');
        new that.dfmain.Interactive({
          childPath: '/financialManagement/deleteDormitoryCost',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            loading.hide();
            that.$refs.promptBox.displayPromptBox('删除成功');

            let needGetIndex = [];
            that.financialManage.detail.forEach(function (item, index) {
              // console.log(that.financialManage.beChoseId.indexOf(item._id),that.financialManage.beChoseId,item._id,index);
              that.financialManage.beChoseId.indexOf(item._id) != -1 ? needGetIndex[parseInt((index / 10) + 1)] = true : void 0;
            })
            console.log(needGetIndex);
            for (let i in needGetIndex) {
              that.getFinancial(i);
            }
            that.getFinancialSummary();
            that.financialManage.beChoseId = [];
          },
          errorCallback: function (result) {
            loading.hide();
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',删除失败,请重试');
          },
        }).init();
      },
      choseDate: function () {
        let that = this;
        that.$weui.datePicker({
          start: new Date(new Date().getTime() - 31536000000),
          end: new Date(),
          defaultValue: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
          onConfirm: function (result) {
            // 二级调用：时间
            console.log(result);
            let time = result[0];
            result[1] < 10 ? time += '.0' + result[1] : time += '.' + result[1];
            result[2] < 10 ? time += '.0' + result[2] : time += '.' + result[2];
            that.financialManage.addDetail.time = time;
          },
          id: 'ma_expect_date',
          className: 'ma_expect_date_picker'
        });
      },
      choseAim: function () {
        let that = this;
        let choseArray = ['所有成员'].concat(this.dormitoryInf.dormitoryMember.split(','));
        let choseItem = [];
        choseArray.forEach(function (item, index) {
          choseItem.push({
            label: item,
            value: index,
          })
        })
        that.$weui.picker(choseItem, {
          depth: 1,
          defaultValue: [0],
          onConfirm: function (result) {
            that.financialManage.addDetail.menber = result[0].label;
          },
          id: 'ma_expect_aim',
          className: 'ma_expect_aim_picker'
        });
      },
      sureAdd: function () {
        let key = true;
        for (let i in this.financialManage.addDetail) {
          if (i!=='openChoseMember'){
            key = key && this.financialManage.addDetail[i];
          }
        }
        if (key) {
          let that = this;
          let formdata = new FormData();
          formdata.append('money', this.financialManage.addDetail.money);
          formdata.append('time', this.financialManage.addDetail.time);
          formdata.append('menber', this.financialManage.addDetail.menber);
          formdata.append('notes', this.financialManage.addDetail.notes);
          let loading = that.$weui.loading('确认加入中...');
          new that.dfmain.Interactive({
            childPath: '/financialManagement/addDormitoryCost',
            method: 'POST',
            detail: formdata,
            successCallback: function (result) {
              loading.hide();
              that.$weui.toast('添加成功', {
                duration: 800,
                className: 'success',
                callback: function () {
                  // that.$router.push('/Query');
                }
              });
              that.financialManage.detail.splice(10, that.financialManage.detail.length - 10);
              that.getFinancial(1);
              that.financialManage.addDetail = {
                money: '',
                notes: '',
                menber: '',
                time: ''
              }
              that.financialManage.add = false;
              that.getFinancialSummary();
            },
            errorCallback: function (result) {
              loading.hide();
              that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + ',添加失败。');
            },
          }).init();
        } else {
          this.$weui.toast('您有信息未输入', {
            duration: 1200,
            className: 'error',
            callback: function () {
              // that.$router.push('/Query');
            }
          })
        }

      },
      getFinancialSummary: function () {
        let that = this;
        let loading = that.$weui.loading('加载中...');
        new that.dfmain.Interactive({
          childPath: '/financialManagement/getFinanceSummary',
          method: 'POST',
          detail: {},
          successCallback: function (result) {
            loading.hide();
            that.financialSummary.dormitoryBalance = result.data.dormitoryBalance;
            that.financialSummary.menberBalance = result.data.menberBalance;
          },
          errorCallback: function (result) {
            loading.hide();
            // that.$weui.toast('')
            if (result.status != '203') {
              that.$refs.promptBox.displayPromptBox(result.msg);
            }
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
      getMyselfMessage: function () {
        let that = this;
        let formdata = new FormData();

        new that.dfmain.Interactive({
          childPath: '/myselfManagement/getMessage',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.messages.detail = result.message;
          },
          errorCallback: function (result) {
            that.dfmain.PromptBox.displayPromptBox('由于' + result.msg + '个人消息查询失败,请重试');
          },
        }).init();
      },
      confirmAccession: function (messageId, dormitoryId) {
        let that = this;
        let formdata = new FormData();
        formdata.append('messageId', messageId);
        formdata.append('dormitoryId', dormitoryId);
        new that.dfmain.Interactive({
          childPath: '/myselfManagement/confirmAccession',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.$refs.promptBox.displayPromptBox('成功加入了该宿舍');
          },
          errorCallback: function (result) {
            that.$refs.promptBox.displayPromptBox('由于' + result.msg + '加入宿舍失败,请重试');
          },
        }).init();
      },
      confirmRefuse: function (messageId, dormitoryId) {
        let that = this;
        let formdata = new FormData();
        formdata.append('messageId', messageId);
        formdata.append('dormitoryId', dormitoryId);
        new that.dfmain.Interactive({
          childPath: '/myselfManagement/confirmRefuse',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            that.$refs.promptBox.displayPromptBox('已拒绝加入该宿舍');

          },
          errorCallback: function (result) {
            that.$refs.promptBox.displayPromptBox('由于' + result.msg + '个人消息查询失败,请重试');
          },
        }).init();
      },
      dealMsg: function (msgIndex) {
        let that = this;
        this.$weui.dialog({
          title: that.messages.detail[msgIndex].title,
          content: that.messages.detail[msgIndex].detail,
          className: 'custom-classname',
          buttons: [{
            label: '拒绝',
            type: 'default',
            onClick: function () {
              that.confirmRefuse(that.messages.detail[msgIndex].messageId, that.messages.detail[msgIndex].inviteDormitoryId);
            }
          }, {
            label: '接受',
            type: 'primary',
            onClick: function () {
              that.confirmAccession(that.messages.detail[msgIndex].messageId, that.messages.detail[msgIndex].inviteDormitoryId);
            }
          }]
        });
      },
      memberOption: function (name) {
        let that=this;
        if (name === '所有成员') {
          this.financialManage.addDetail.menber === '所有成员' ? this.financialManage.addDetail.menber = '' : this.financialManage.addDetail.menber = '所有成员';
          return true;
        }
        if (this.financialManage.addDetail.menber) {
          if (this.financialManage.addDetail.menber!='所有成员'){
            let position = this.financialManage.addDetail.menber.split(',').indexOf(name);
            if (position === -1) {
              let testArray=this.financialManage.addDetail.menber.split(',');
              testArray.push(name);
              let key=true;
              testArray.forEach(function (item,index) {
                key=key && that.dormitoryInf.dormitoryMember.split(',').indexOf(item)!==-1
              })
              if (key) {
                this.financialManage.addDetail.menber = '所有成员';
              } else {
                this.financialManage.addDetail.menber += ',' + name;
              }
            }
            else {
              let newMember = ''
              this.financialManage.addDetail.menber.split(',').forEach(function (item, index) {
                if (position != index) {
                  newMember += item + ','
                }
              })
              newMember=newMember.replace(/,$/, '');
              this.financialManage.addDetail.menber = newMember;

            }
          } else {
            console.log(this.dormitoryInf.dormitoryMember.split(',').splice(this.dormitoryInf.dormitoryMember.split(',').indexOf(name),1).join(','));
            let newMember=this.dormitoryInf.dormitoryMember.split(',');
            newMember.splice(this.dormitoryInf.dormitoryMember.split(',').indexOf(name),1);
            this.financialManage.addDetail.menber=newMember.join(',');
          }



        } else {
          this.financialManage.addDetail.menber = name;
        }
      },
      //手势拖动识别部分
      //对Y轴、纵向的拖动识别
      startYDrag: function () {
        this.statusChange.dragStartY = event.targetTouches[0].clientY;
        this.statusChange.nowY = event.targetTouches[0].clientY;
      },
      draggYing: function () {
        this.statusChange.nowY = event.touches[0].clientY;
      },
      dragYend: function () {
        if ((this.statusChange.dragStartY - this.statusChange.nowY) / this.statusChange.dragYRatio >= this.statusChange.loadMoreSize) {
          this.getFinancial()
        }

        this.statusChange.dragStartY = 0;
        this.statusChange.nowY = 0;

      },
      //对X轴、纵向的拖动识别
      startXDrag: function () {
        this.statusChange.dragStartX = event.targetTouches[0].clientX;
        this.statusChange.nowX = event.targetTouches[0].clientX;
      },
      draggXing: function () {
        this.statusChange.nowX = event.touches[0].clientX;
      },
      dragXend: function () {
        let len = 0;
        for (let i of this.activeFunction.canUse) {
          i ? len += 1 : void(0);
        }
        if (Math.abs((this.statusChange.dragStartX - this.statusChange.nowX)) / this.statusChange.dragXRatio >= this.statusChange.loadMoreSize) {
          if (this.statusChange.dragStartX - this.statusChange.nowX < 0 && this.activeFunction.index > 0) {
            this.activeFunction.index--
          } else {
            if (this.statusChange.dragStartX - this.statusChange.nowX > 0 && this.activeFunction.index < len - 1) {
              this.activeFunction.index++;
            }
          }

        }
        this.statusChange.dragStartX = 0;
        this.statusChange.nowX = 0;

      },

      batchUpload: function () {
        let that = this;
        let loading = that.$weui.loading('开始上传请等待...');
        let formdata = new FormData();
        formdata.append('file', that.financialManage.file);
        new that.dfmain.Interactive({
          childPath: '/financialManagement/batchUpload',
          method: 'POST',
          detail: formdata,
          successCallback: function (result) {
            loading.hide();
            that.$weui.toast('批量导入成功', {
              duration: 1200,
              className: 'bears',
            })
            that.financialManage.detail.splice(10, that.financialManage.detail.length - 10);
            that.getFinancial(1);
            that.financialManage.choseExcel = false;
          },
          errorCallback: function (result) {
            loading.hide();
            that.$weui.toast('由于' + result.msg + ',批量导入失败,请重试', {
              duration: 1200,
              className: 'error',
            })
          },
        }).init();
      },
      upFile: function (event) {
        if (event.target.files[0]) {
          let file = event.target.files[0];
          this.financialManage.file = file;
          this.financialManage.choseExcel = true;
        }

      },
      choseFile: function () {
        $('#batchUpload').click()
      },
      toEditInf: function (data) {
        let index = this.editData.name.indexOf(data.name)
        this.editData.initData = {
          name: data.name,
          keyValue: data.value,
          url: this.editData.url[index],
          nameKey: this.editData.key[index],
          keyDetail: this.editData.keyDetail[index]
        }
        this.$refs['edit-inf'].changeStatus();
      }
    },
    mounted: function () {
      this.getMyselfInformation();
      this.getFinancial();
      this.getFinancialSummary();
      this.getMyselfMessage();
    },
  }
</script>

<style scoped>
  .fm-main {
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    background-color: rgb(247, 245, 246);
  }

  /*---------------------------------头部用户信息部分---------------------------------------*/
  .mainHead {
    padding: 0.4rem 0.4rem 0.6rem 0.4rem;
    display: flex;
    justify-content: space-between;
    background-color: white;
  }

  .mainHead > div {
    display: inline-flex;
  }

  .headLeft {
    flex-grow: 1;
  }

  .sexIcon {
    display: inline-flex;
    margin-left: 0.2rem;
  }

  .sexIcon > img {
    height: 0.5rem;
    width: 0.5rem;
  }

  .headImg > img {
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
  }

  .headLeft {
    flex-direction: column;
  }

  .headLeft > div:first-child {
    flex-direction: row;
    align-items: center;
  }

  .name {
    font-size: 0.65rem;
    display: inline-flex;
  }

  .userName {
    font-size: 0.3rem;
    color: rgba(128, 128, 128, 0.9);
    margin-top: 0.12rem;
  }

  /*---------------------------------选择功能部分---------------------------------------*/
  .choseFunction {
    background-color: white;
    padding: 0.4rem 0.3rem 0.2rem 0.3rem;

  }

  .choseShell {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.1rem;

  }

  .choseBtn {
    font-size: 0.34rem;
    color: #777;
    flex-grow: 1;
    border-bottom: rgba(0, 0, 0, 0.02) 0.03rem solid;
    text-align: center;
    padding-bottom: 0.05rem;
  }

  .functionActive {
    color: #67b168 !important;
    border-bottom: #67b168 solid 0.03rem !important;
  }

  /*---------------------------------具体功能部分---------------------------------------*/
  .allFunction {
    margin-top: 0.2rem;
    background-color: white;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: row;
  }

  .allFunction > div {
    width: 100vw;
    display: inline-flex;
  }

  /*---------------------------------财务管理功能部分---------------------------------------*/

  .financialPart {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgb(247, 245, 246);
  }

  .financialSummary,
  .messageShell {
    width: 100vw;
    margin-bottom: 0.4rem;
    display: inline-flex;
    flex-direction: column;
    padding: 0.2rem 0.4rem;
    background-color: white;
  }

  .financialSummary > div {
    display: flex;
  }

  .summaryHead {
    display: inline-flex;
    align-items: center;
    font-size: 0.36rem;
    border-bottom: rgba(128, 128, 128, 0.3) solid 0.03rem !important;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
  }

  .summaryHead > div {
    flex-grow: 1;
  }

  .summaryBody {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    transition: 0.2s ease all;
  }

  .summaryBody > div {
    display: inline-flex;
    width: 50%;
    margin-top: 0.1rem;
  }

  .summaryName,
  .summaryMoney {
    font-size: 0.34rem;
  }

  .summaryMoney {
    margin-left: 0.2rem;
  }

  .financialMain {
    background-color: white;

  }

  .financialHead,
  .messageHead {
    display: flex;
    align-items: center;
    padding: 0.2rem 0.4rem;
  }

  .messageHead {
    padding: 0;
    border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
  }

  .financialHead > div,
  .messageHead > div {
    display: inline-flex;
  }

  .financialHead > div:first-child,
  .messageHead > div:first-child {
    flex-grow: 1;
    font-size: 0.37rem;

  }

  .downloadSimple {
    font-size: 0.33rem;
    color: rgba(35, 183, 229, 0.9);
  }

  .financialEdit {
    font-size: 0.33rem;
    color: #67b168;
    margin-left: 0.4rem;
  }

  .financialMain table {
    width: 9.2rem;
    margin-left: 0.4rem;

  }

  .financialMain thead {
    border-top: rgba(0, 0, 0, 0.1) solid 1px;
    border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
    width: 100%;
  }

  .financialMain thead tr {
    background-color: white;

  }

  .financialMain thead th {
    padding: 0.1rem 0;
    font-size: 0.35rem;
    font-weight: bold;
    text-align: center;
  }

  .financialTable {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60vh;
  }

  .financialMain tbody td {
    text-align: center;
    font-size: 0.35rem;
    padding: 0.1rem 0;
  }

  /*__________________________________________________________________________________________*/
  /*lable标签的大小、位置、背景颜色更改，在css选择时，“+”代表相邻元素，即当前元素的下一元素*/
  [type=checkbox] {
    display: none;
    text-align: center;
  }

  [type=checkbox] + label {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    cursor: pointer;
    position: relative;
    top: 0.1rem;
    /*left: 15px;*/
    background: rgba(0, 0, 0, 0);
    border: #67b168 solid 1px;
    border-radius: 0.4rem;
    overflow: hidden;
  }

  /*当input框为选中状态时，lable标签的样式，其中在css选择时，“：”表示当前input框的值，即checked；
        该部分主要对显示的“对号”的大限居中方式，显示颜色进行了设置*/
  [type=checkbox]:checked + label::before {
    display: block;
    content: "\2714";
    text-align: center;
    font-size: 0.3rem;
    color: #67b168;
    background: white;
    position: relative;
    top: -0.02rem;
    left: -0.02rem;
  }

  [type=checkbox] + label + div {
    vertical-align: middle;
    display: inline;
  }

  /*_____________________________________位于底部的编辑功能____________________________________________*/

  .editFunction {

    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    background-color: white;
  }

  .editShell {
    position: fixed;
    bottom: 0;
    width: 100vw;
    z-index: 9;
  }

  .choseAll {
    flex-grow: 1;
    align-items: center;
  }

  .choseAll > label {
    display: inline-flex;
    width: 0.45rem;
    height: 0.45rem;
    margin-bottom: 0;
  }

  .choseAll [type=checkbox]:checked + label::before {
    font-size: 0.4rem;
    position: relative;
    top: -0.06rem;
    left: 0.03rem;
  }

  .choseAll > div {
    display: inline-flex;
    margin-left: 0.4rem;
    font-size: 0.37rem;
  }

  .importTable,
  .newDetail {
    font-size: 0.35rem;
    color: #67b168;
    margin-right: 0.4rem;
  }

  .deleteDetail {
    font-size: 0.35rem;
    color: rgba(255, 0, 0, 0.48);
  }

  .addDetail {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: flex;
    flex-wrap: wrap;
    transform: translateY(-100%);
    background-color: white;
    padding: 0.2rem 0.4rem;
    align-content: space-between;

  }

  .addDetail > div {
    display: inline-flex;
    position: relative;
    margin-top: 0.2rem;
  }

  .addDetail > div > label {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(239, 239, 239, 1);
    font-size: 0.34rem;
    font-weight: 500;
    padding: 0.05rem 0.2rem;
  }

  .addDetail > div > input {
    border: 0.03rem solid rgba(239, 239, 239, 1);
    text-align: right;
    padding: 0.05rem 0.2rem;
    font-size: 0.34rem;
    width: 100%;
  }

  .addMoney,
  .addNotes {
    flex-grow: 1;
    margin-right: 0.5rem;
  }

  .addTime,
  .addMenber {
    width: 3.5rem;
  }
  .addTime>input:disabled,
  .addMenber>input:disabled{
    background-color: transparent;
  }

  .financialBody {
    position: relative;
    overflow: hidden;
  }

  .loadMore {
    width: 100vw;
    position: absolute;
    top: 100%;
    margin: 0;
  }

  .foldIcon {
    width: 0.4rem;
    height: 0.4rem;
    transition: all 0.2s ease;
  }

  .changeDownloadType {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.2rem;
  }

  .success {
    color: rgba(82, 184, 19, 0.48);
    font-size: 0.34rem;
    margin-right: 0.4rem;
  }

  .link {
    color: rgba(35, 183, 229, 0.9) !important;
    font-size: 0.34rem;
    margin-right: 0.4rem;
  }

  .sure {
    color: #67b168;
    font-size: 0.34rem;
    margin-right: 0.4rem;

  }

  .cancel {
    color: #e5e5e5;
    font-size: 0.34rem;

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

  .messageBody {
    padding-top: 0.1rem;
    display: flex;
    flex-direction: row;
  }

  .messageBody > div {
    display: inline-flex;
  }

  .msgCheck {
    position: relative;
    align-items: center;
    margin-right: 0.2rem;
  }

  .messageDetail {
    flex-direction: column;
    flex-grow: 1;
  }

  .msgDetHead {
    flex-direction: row;
    display: flex;
    align-items: center;
  }

  .msgDetHead > div {
    display: inline-flex;
  }

  .msgDetTime {
    font-size: 0.35rem;
    flex-grow: 1;
    justify-content: flex-end;
  }

  .msgDetTitle {
    font-size: 0.36rem;
    margin: 0.1rem 0;
    font-weight: bold;
  }

  .msgDetBody {
    flex-direction: row;
    margin-top: 0.1rem;
    align-items: center;
    display: flex;
  }

  .msgDetBodyText {
    font-size: 0.33rem;
    margin: 0;
    display: inline-flex;
    flex-grow: 1;
  }

  .dealMsg {
    display: inline-flex;
    background-color: transparent;
    border: none;
    border-bottom: solid 0.03rem #67b168;
    color: #67b168;
    font-size: 0.35rem;
    padding: 0rem 0.1rem 0.01rem;
  }

  .choseMember {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: space-around;
  }

  .memberList {
    display: inline-flex;
    padding: 0.2rem;
    width: 40%;
    font-size: 0.42rem;
    background-color: rgb(242, 242, 242);
    margin-bottom: 0.4rem;
    justify-content: center;
    color: rgba(25, 25, 25,0.7);
    transition: all;
  }

  .memberList:after,
  .memberList:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    background-color: transparent;
  }

  .memberList:before {
    left: 0;
    top: 0;
    border-top: solid 0.03rem rgb(7, 193, 96);
    border-right: solid 0.03rem rgb(7, 193, 96);
  }

  .memberList:after {
    right: 0;
    bottom: 0;
    border-bottom: solid 0.03rem rgb(7, 193, 96);
    border-left: solid 0.03rem rgb(7, 193, 96);
  }

  .beChoseMember {
    position: relative;
    color: rgb(7, 193, 96);
    background: transparent;
  }

  .beChoseMember:after,
  .beChoseMember:before {
    animation: btnFrameTop 0.3s ease;
    width: 100%;
    height: 100%;
  }

  .routeArrow {
    transform: rotate(-90deg);
  }

  .up-to-in-enter,
  .up-to-in-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .up-to-in-enter-to,
  .up-to-in-leave {
    transform: translateY(0);
    opacity: 1;
  }

  .up-to-in-enter-active,
  .up-to-in-leave-active {
    transition: all ease 0.2s;
  }

  .add-up-to-in-enter,
  .add-up-to-in-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .add-up-to-in-enter-to,
  .add-up-to-in-leave {
    transform: translateY(-100%);
    opacity: 1;
  }

  .add-up-to-in-enter-active,
  .add-up-to-in-leave-active {
    transition: all ease 0.2s;

  }

  @keyframes btnFrameTop {
    0% {
      width: 0;
      height: 1px;
    }
    50% {
      width: 100%;
      height: 1px;
    }
    100% {
      width: 100%;
      height: 100%;
    }
  }

</style>
