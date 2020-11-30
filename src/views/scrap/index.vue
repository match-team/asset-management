<!-- 报废页面 -->
<template>
  <div class="container" style="overflow-y: auto">

    <!-- 顶部栏 -->
    <div >
      <Button type="success" @click="modalShow = true">新建</Button>
      <Select v-model="company" style="width: 200px;margin: 0 10px;" placeholder="请选择公司">
        <Option v-for="item in companies" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </Select>

      <Input placeholder="请输入关键字" style="width: auto; margin-right: 10px" v-model="searchKey">
        <Icon type="ios-search" slot="suffix"/>
      </Input>
      <Button type="info" @click="queryPage(1)">查询</Button>
    </div>
    <!-- 表格内容 -->
    <Table border  :columns="columns" :data="pageResult.detail" height="400" @on-selection-change="changeSelect"></Table>
    <Page :total="pages" :current="pageNum" :page-size="pageSize" @on-change="changePageNum" show-total class="pagenation"  />

    <!-- 弹窗-报废功能确认流程 -->

    <Modal v-model="modalShow" title="新建报废" @on-ok="okNew" width="900">
      <Row :gutter="16">
        <Col span="12">
          <label>报废资产：</label>
          <Select v-model="recordObj.goodsId" placeholder="报废资产">
            <Option v-for="item in goods" :value="item.id" :key="item.id">
              {{ item.goodsName }}
            </Option>
          </Select>
        </Col>
        <Col span="12"><label>使用公司/部门：</label><Input v-model="recordObj.ownerInfo"/></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <label>报废日期：</label>
          <DatePicker :editable="false" @on-change="changeDateTime" type="date"></DatePicker>
        </Col>
        <Col span="12"><label>是否一键转卖：</label>
          <RadioGroup v-model="recordObj.flag1">
            <Radio label="1">是</Radio>
            <Radio label="0">不是</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>说明：</label><Input v-model="recordObj.readme"/></Col>
      </Row>
      <Row>
        <Col span="24">上传图片:</Col>
        <Col span="24">
          <div class="demo-upload-list" v-if="recordObj.filePaths">
            <img :src="baseURL+recordObj.filePaths"
                 style="width: 58px; height: 58px; line-height: 58px"/>
          </div>
          <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="uploadObj.defaultList"
              :on-success="fileHandleSuccess"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              :on-format-error="uploadObj.handleFormatError"
              :on-exceeded-size="uploadObj.handleSizeOutError"
              :before-upload="uploadObj.handleBeforeUpload"
              multiple
              type="drag"
              name="files"
              :action="fileUrl"
              style="display: inline-block; width: 58px">
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </Col>
      </Row>
    </Modal>

    <Modal title="附件图片预览" v-model="fjvisible">
      <img :src="fjUrl" style="width: 100%"/>
    </Modal>

  </div>
</template>

<script>
import axios from "@/utils/axios";

export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      uploadObj: {
        defaultList: [],
        handleFormatError: function () {
          alert("格式不正确")
        },
        handleSizeOutError: function () {
          alert("个数超了")
        },
        handleBeforeUpload: function () {
          return true;
        }
      },//上传对象
      //附件图片预览
      fjvisible: false,
      fjUrl: '',
      baseURL: axios.defaults.baseURL,
      fileUrl: axios.defaults.baseURL + "rest/saveFile",
      selectArr:[],
      fileVisible: false,
      columns: [
        {
          title: '资产编码',
          key: 'goodsNum',
          width: 100,
          fixed: 'center'
        },
        {
          title: '资产名称',
          key: 'goodsName',
          width: 100
        },
        {
          title: '办理状态',
          key: 'status',
          width: 100,
          render:function (h,params){
            if (params.row.status==1){
              return h('span','通过');
            }
            if (params.row.status==0){
              return h('span','待处理');
            }
            if (params.row.status==2){
              return h('span','拒绝');
            }
            return h('span','未知');
          }
        },
        {
          title: '是否一键转卖',
          key: 'status',
          width: 100,
          render:function (h,params){
            if (params.row.flag1==1){
              return h('span','是');
            }
            if (params.row.flag1==0){
              return h('span','不是');
            }
            return h('span','不是');
          }
        },
        {
          title: '报废单号',
          key: 'billNo',
          width: 100
        },
        {
          title: '使用公司/部门',
          key: 'ownerInfo',
          width: 100
        },
        {
          title: '报废日期',
          key: 'destroyDate',
          width: 100
        },
        {
          title: '申请人',
          key: 'applyUserid',
          width: 100
        },
        {
          title: '备注',
          key: 'readme',
          width: 200
        },
        {
          title: '附件',
          key: 'filePaths',
          width: 100,
          render: (h, params) => {
            let that =this;
            let filePaths = params.row.filePaths;
            let fileA = [];
            if (filePaths) {
              let list = filePaths.split(";");
              for (let i = 0; i < list.length; i++) {
                let fileName = list[i];
                let fileUrl = axios.defaults.baseURL + fileName;
                fileA.push(h("Button", {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    "click": function () {
                      that.fjvisible = true;
                      that.fjUrl = fileUrl;
                    }
                  }
                }, fileName))
              }
            }
            if (fileA.length == 0) {
              return h('span', {}, '无')
            }
            return h('span', fileA)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 260,
          render: (h,params) => {
            let id=params.row.id;
            let that=this;
            return h('div', [
              h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '15px'
                    },
                    on:{
                      "click":function (){
                        that.openSureAll(true,id);
                      }
                    }
                  },
                  '报废'
              ),
              h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '15px'
                    },
                    on:{
                      "click":function (){
                        that.openSureAll(false,id);
                      }
                    }
                  },
                  '驳回'
              )])
          }
        }
      ],//表格标签
      modalShow: false,
      searchKey: "",//查询关键字
      goods: [],//物资明细
      companies:  [
        {
          value: '欧冶采购',
          label: '欧冶采购'
        },
        {
          value: '欧冶金融',
          label: '欧冶金融'
        },
        {
          value: '欧冶云商',
          label: '欧冶云商'
        },
        {
          value: '东方钢铁',
          label: '东方钢铁'
        },
        {
          value: '欧冶物流',
          label: '欧冶物流'
        }
      ],//公司集合
      company: '',//公司
      pageNum: 1,
      pageSize: 10,
      pages: 100,
      pageResult: {
        detail: []
      },
      recordObj: {
        id: null,
        goodsId: "",
        ownerInfo: "",
        destroyDate: "",
        readme: "",
        flag1:"1",
        filePaths:""
      }//新建/编辑记录对象
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadGoods();
    this.queryPage(1);
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    queryPage(pageNum) {
      if (pageNum) {
        this.pageNum = pageNum;
      }
      let params = {
        current: this.pageNum,
        size: this.pageSize,
        readme: this.searchKey,
        ownerInfo: this.company
      }
      let that = this;
      let url = "/rest/destroyrecord/list";
      console.log("params" + JSON.stringify(params));
      axios.get(url, {params: params}).then(function (r) {
        console.log(r);
        if (r.success) {
          that.pageResult.detail = r.detail.records;
          that.pages = r.detail.total;
          return;
        }
        that.$Notice.error({title: '错误', desc: r.msg});
      }, function (e) {
        console.log(e);
        that.$Notice.error({title: '错误', desc: '系统异常'});
      })
    },
    loadGoods() {
      let that = this;
      let url = "/goodsRecord/allGoodsRecordList";
      axios.get(url).then(function (r) {
        console.log(r);
        if (r.success) {
          that.goods = r.detail
        }
      })
    },
    okNew() {
      let that = this;
      let params = this.recordObj;
      if (!params) {
        this.$Notice.error({title: '错误', desc: '请填写信息'});
        return false;
      }
      let url = "/rest/destroyrecord/add";
      console.log("params" + JSON.stringify(params));
      axios.post(url, params).then(function (r) {
        if (r.success) {
          that.queryPage(1);
          that.$Notice.success({title: '成功', desc: '添加成功'});
          return
        }
        that.$Notice.error({title: '错误', desc: r.msg});
      }, function (e) {
        console.log(e);
        that.$Notice.error({title: '错误', desc: '系统异常'});
      })
    },
    changePageNum(num){
      this.queryPage(num);
    },
    changeDateTime:function (val){
      this.recordObj.destroyDate=val;
    },
    openSureAll:function (mark,id){
      let that =this;
      this.$Modal.confirm({
        title: '是否确认',
        onOk: () => {
          that.xx(mark,id);
        },
        onCancel: () => {
        }
      });
    },
    changeSelect:function (selection){
      this.selectArr=selection;
    },
    xx:function (mark,id){
      if (mark){
        this.passMethod(id)
      }else{
        this.notPassMethod(id)
      }
    },
    passMethod:function (id){
      let that=this;
      let url = "/rest/destroyrecord/auditPass/"+id;
      axios.get(url).then(function (r) {
        console.log(r);
        if (r.success) {
          that.queryPage(1);
          return;
        }
        that.$Notice.error({title: '错误', desc: r.msg});
      }, function (e) {
        console.log(e);
        that.$Notice.error({title: '错误', desc: '系统异常'});
      })
    },
    notPassMethod:function (id){
      debugger
      let that=this;
      let url = "/rest/destroyrecord/auditNoPass/"+id;
      axios.get(url).then(function (r) {
        console.log(r);
        if (r.success) {
          that.queryPage(1);
          return;
        }
        that.$Notice.error({title: '错误', desc: r.msg});
      }, function (e) {
        console.log(e);
        that.$Notice.error({title: '错误', desc: '系统异常'});
      })
    },
    fileHandleSuccess(r) {
    console.log(r);
    if (r.success) {
      this.recordObj.filePaths = r.detail;
    }
  }
  }
}
</script>

<style lang="less" scoped>
.table_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.add_attribute {
  margin-top: 10px;
  padding: 10px 0;
  border-top: 1px solid @border-color;
}
.ivu-col {
  margin: 0 10px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  label {
    width: 100px;
  }
}
/deep/ .ivu-date-picker {
  width: 100%;
}
</style>