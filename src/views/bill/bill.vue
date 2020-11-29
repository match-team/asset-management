<template>
  <div class="container">
    <div class="table_top">
      <div>
        <Button type="success" @click="modalShow = true">新建</Button>
        <Select v-model="company" style="width: 200px;margin: 0 10px;" placeholder="请选择公司">
          <Option v-for="item in companies" :value="item.value" :key="item.value">
            {{item.label}}
          </Option>
        </Select>

        <Input placeholder="请输入关键字" style="width: auto; margin-right: 10px" v-model="searchKey">
          <Icon type="ios-search" slot="suffix" />
        </Input>
        <Button type="info" @click="queryPage(1)">查询</Button>
      </div>
      <div>
        <Button type="info" style="margin-right: 10px" @click="Importfile">导入</Button>
        <Button type="success">导出</Button>
      </div>
    </div>
    <Table border :columns="columns" :data="pageResult.detail" height="400"></Table>
    <Page :total="pages" :current="pageNum" :page-size="pageSize" @on-change="changePageNum" show-total class="pagenation"  />
    <Modal v-model="modalShow" title="新建入账" @on-ok="okNew"  width="900" >
      <Row :gutter="16">
        <Col span="12">
          <label>入账资产：</label>
          <Select v-model="recordObj.goodsId" placeholder="入账资产">
            <Option v-for="item in goods" :value="item.id" :key="item.id">
              {{item.goodsName}}
            </Option>
          </Select>
        </Col>
        <Col span="12"><label>供应商：</label><Input v-model="recordObj.supplier" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>含税金额：</label><Input v-model="recordObj.amountTaxPrice" /></Col>
        <Col span="12"><label>税额：</label><Input v-model="recordObj.taxPrice" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>累计折旧，残值率（%）：</label><Input v-model="recordObj.oldRate" /></Col>
        <Col span="12">
          <label>入账日期：</label>
          <DatePicker type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="yyyy-MM-dd HH:mm"
                      @on-change="changeDateTime"
                      style="width: 300px">
          </DatePicker>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>财务使用期限（月）：</label><Input v-model="recordObj.financeMonth" /></Col>
        <Col span="12"><label>已使用月数：</label><Input v-model="recordObj.costMonth" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>所属公司：</label><Input v-model="recordObj.ownerCompany" /></Col>
        <Col span="12"><label>分摊部门：</label><Input v-model="recordObj.department" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>使用人：</label><Input v-model="recordObj.giveUserid" /></Col>
      </Row>
      <Row>
        <Col span="24">上传图片:</Col>
        <Col span="24">
          <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="uploadObj.defaultList"
              :on-success="uploadObj.handleSuccess"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              :on-format-error="uploadObj.handleFormatError"
              :on-exceeded-size="uploadObj.handleSizeOutError"
              :before-upload="uploadObj.handleBeforeUpload"
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block; width: 58px"
          >
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </Col>
      </Row>
    </Modal>
    <Modal v-model="fileVisible" title="导入文件" @on-ok="okImport" >
      <Row>
        <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽到这里上传</p>
          </div>
        </Upload>
      </Row>
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
      searchKey:"",//查询关键字
      uploadObj:{
        defaultList:[],
        handleSuccess:function (){},
        handleFormatError:function (){},
        handleSizeOutError:function (){},
        handleBeforeUpload:function (){}
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
          width: 100
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
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 140,
          render: h => {
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
                    }
                  },
                  '编辑'
              ),
              h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    }
                  },
                  '删除'
              )
            ])
          }
        }
      ],//表格标签
      pageNum:1,
      pageSize:10,
      pages:100,
      pageResult:{
        detail:[]
      },
      fileVisible: false,
      modalShow: false,
      companies: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '东方钢铁',
          label: '东方钢铁'
        },
        {
          value: '欧冶金服',
          label: '欧冶金服'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],//公司集合
      company: '',//公司
      goods:[],//物资明细
      recordObj:{
        id:null,
        goodsId:"",
        supplier:"",
        amountTaxPrice:"",
        taxPrice:"",
        oldRate:"",
        billDate:"",
        financeMonth:"",
        costMonth:"",
        ownerCompany:"",
        department:"",
        giveUserid:"",
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
  mounted() {},
  beforeDestroy() {},
  methods: {
    Importfile() {
      this.fileVisible = true
    },
    changePageNum(num){
      this.queryPage(num);
    },
    okNew(){
      let that =this;
      let params=this.recordObj;
      if (!params){
        this.$Notice.error({title: '错误', desc: '请填写信息'});
        return false;
      }
      if (!params.goodsId){
        this.$Notice.error({title: '错误', desc: '请选择物资'});
        return false;
      }
      if (!params.amountTaxPrice){
        this.$Notice.error({title: '错误', desc: '含税金额不能为空'});
        return false;
      }
      let url="/billRecord/add";
      console.log("params"+JSON.stringify(params));
      axios.post(url,params).then(function (r){
        if (r.success) {
          that.queryPage(1);
          that.$Notice.success({title: '成功', desc: '添加成功'});
          return
        }
        that.$Notice.error({title: '错误', desc: r.msg});
      },function (e){
        console.log(e);
        that.$Notice.error({title: '错误', desc: '系统异常'});
      })
    },
    okImport(){},
    queryPage(pageNum){
      let that =this;
      if (pageNum){
        this.pageNum=pageNum;
      }
      let params={
        current:this.pageNum,
        size:this.pageSize,
        searchKey:this.searchKey,
        ownerCompany:this.company
      }
      console.log("params"+JSON.stringify(params));
      let url="/billRecord/queryList";
      axios.get(url,{params:params}).then(function (r){
        console.log(r);
        if (r.success){
          that.pageResult.detail=r.detail.records;
          that.pages=r.detail.total;
          return;
        }
        that.$Notice.error({title: '错误', desc: r.msg});
      },function (e){
        console.log(e);
        that.$Notice.error({title: '错误', desc: '系统异常'});
      })
    },
    loadGoods(){
      let that =this;
      let url="/goodsRecord/allGoodsRecordList";
      axios.get(url).then(function (r){
        console.log(r);
        if (r.success){
          that.goods=r.detail
        }
      })
    },
    changeDateTime:function (val){
      this.recordObj.billDate=val;
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

</style>