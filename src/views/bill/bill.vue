<template>
  <div class="container">
    <div class="table_top">
      <div>
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
    </div>
    <Table border :columns="columns" :data="pageResult.detail" height="400"></Table>
    <Page :total="pages" :current="pageNum" :page-size="pageSize" @on-change="changePageNum" show-total
          class="pagenation"/>
    <Modal v-model="modalShow" title="新建入账" @on-ok="okNew" width="900">
      <Row :gutter="16">
        <Col span="12">
          <label>入账资产：</label>
          <Select v-model="recordObj.goodsId" placeholder="入账资产">
            <Option v-for="item in goods" :value="item.id" :key="item.id">
              {{ item.goodsName }}
            </Option>
          </Select>
        </Col>
        <Col span="12">
          <label>入账日期：</label>
          <DatePicker :editable="false" @on-change="changeDateTime" type="date"></DatePicker>
        </Col>

      </Row>
      <Row :gutter="16">
        <Col span="12"><label>含税金额：</label><Input v-model="recordObj.amountTaxPrice"/></Col>
        <Col span="12"><label>税额：</label><Input v-model="recordObj.taxPrice"/></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>累计折旧，残值率（%）：</label><Input v-model="recordObj.oldRate"/></Col>
        <Col span="12"><label>供应商：</label><Input v-model="recordObj.supplier"/></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>财务使用期限（月）：</label><Input v-model="recordObj.financeMonth"/></Col>
        <Col span="12"><label>已使用月数：</label><Input v-model="recordObj.costMonth"/></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>所属公司：</label><Input v-model="recordObj.ownerCompany"/></Col>
        <Col span="12"><label>分摊部门：</label><Input v-model="recordObj.department"/></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>使用人：</label><Input v-model="recordObj.giveUserid"/></Col>
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
import axios from '../../utils/axios';

export default {
  name: 'bill',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      fileUrl: axios.defaults.baseURL + "rest/saveFile",
      searchKey: "",//查询关键字
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
          title: '资产类型',
          key: 'goodsType',
          width: 100
        },
        {
          title: '供应商',
          key: 'supplier',
          width: 100
        },
        {
          title: '资产来源',
          key: 'source',
          width: 100
        },
        {
          title: '原值',
          key: 'price',
          width: 100
        },
        {
          title: '含税金额',
          key: 'amountTaxPrice',
          width: 100
        },
        {
          title: '税额',
          key: 'taxPrice',
          width: 100
        },
        {
          title: '累计折旧，残值率（%）',
          key: 'oldRate',
          width: 200
        },
        {
          title: '入账日期',
          key: 'billDate',
          width: 120,
          render:(h,params)=>{
            let that =this;
            let str=that.$options.filters['DATE_DAY'](params.row.billDate);
            return h('span',str);
          }
        },
        {
          title: '财务使用期限（月）',
          key: 'financeMonth',
          width: 200
        },
        {
          title: '已使用月数',
          key: 'costMonth',
          width: 110
        },
        {
          title: '所属公司',
          key: 'ownerCompany',
          width: 100
        },
        {
          title: '分摊部门',
          key: 'department',
          width: 100
        },
        {
          title: '使用人',
          key: 'giveUserid',
          width: 100
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
        }
      ],//表格标签
      pageNum: 1,
      pageSize: 10,
      pages: 100,
      pageResult: {
        detail: []
      },
      //附件图片预览
      fjvisible: false,
      fjUrl: '',
      fileVisible: false,
      modalShow: false,
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
      goods: [],//物资明细
      recordObj: {
        id: null,
        goodsId: "",
        supplier: "",
        amountTaxPrice: "",
        taxPrice: "",
        oldRate: "",
        billDate: "",
        financeMonth: "",
        costMonth: "",
        ownerCompany: "",
        department: "",
        giveUserid: "",
        filePaths: ""
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
    Importfile() {
      this.fileVisible = true
    },
    changePageNum(num) {
      this.queryPage(num);
    },
    okNew() {
      let that = this;
      let params = this.recordObj;
      if (!params) {
        this.$Notice.error({title: '错误', desc: '请填写信息'});
        return false;
      }
      if (!params.goodsId) {
        this.$Notice.error({title: '错误', desc: '请选择物资'});
        return false;
      }
      if (!params.amountTaxPrice) {
        this.$Notice.error({title: '错误', desc: '含税金额不能为空'});
        return false;
      }
      let url = "/billRecord/add";
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
    okImport() {
    },
    queryPage(pageNum) {
      let that = this;
      if (pageNum) {
        this.pageNum = pageNum;
      }
      let params = {
        current: this.pageNum,
        size: this.pageSize,
        searchKey: this.searchKey,
        ownerCompany: this.company
      }
      console.log("params" + JSON.stringify(params));
      let url = "/billRecord/queryList";
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
    changeDateTime: function (val) {
      debugger
      this.recordObj.billDate = val;
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