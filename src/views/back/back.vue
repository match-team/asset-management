<template>
  <div class="container" style="overflow-y: auto">
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
    </div>
    <Table border :columns="columns" :data="pageResult.detail" height="400"></Table>
    <Page :total="pages" :current="pageNum" :page-size="pageSize" @on-change="changePageNum" show-total class="pagenation"  />
    <Modal v-model="modalShow" title="新建退库" @on-ok="okNew"  width="900">
      <Row :gutter="16">
        <Col span="12">
          <label>退库资产：</label>
          <Select v-model="recordObj.goodsId" placeholder="退库资产">
            <Option v-for="item in goods" :value="item.id" :key="item.id">
              {{item.goodsName}}
            </Option>
          </Select>
        </Col>
        <Col span="12"><label>使用公司：</label><Input v-model="recordObj.company" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <label>退库日期：</label>
          <DatePicker :editable="false" @on-change="changeDateTime" type="date"></DatePicker>
        </Col>
        <Col span="12"><label>使用区域：</label><Input v-model="recordObj.area" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>存放地点：</label><Input v-model="recordObj.storePlace" /></Col>
        <Col span="12"><label>备注：</label><Input v-model="recordObj.remark" /></Col>
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
import axios from "@/utils/axios";

export default {
  name: 'give',
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
          title: '办理状态',
          key: 'status',
          width: 100,
          render:function (h,params){
            if (params.row.status==1){
              return h('span','已处理');
            }
            return h('span','待处理');
          }
        },
        {
          title: '退库单号',
          key: 'billNo',
          width: 100
        },
        {
          title: '使用公司',
          key: 'company',
          width: 100
        },
        {
          title: '退库日期',
          key: 'backDate',
          width: 120,
          render:(h,params)=>{
            let that =this;
            let str=that.$options.filters['DATE_DAY'](params.row.backDate);
            return h('span',str);
          }
        },
        {
          title: '使用区域',
          key: 'area',
          width: 100
        },
        {
          title: '存放地点',
          key: 'storePlace',
          width: 100
        },
        {
          title: '处理人',
          key: 'adminId',
          width: 100
        },
        {
          title: '备注',
          key: 'remark',
          width: 200
        }
      ],//表格标签
      pageNum:1,
      pageSize:10,
      pages:100,
      pageResult:{
        detail:[
        ]
      },
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
      goods:[],//物资明细
      recordObj:{
        id:null,
        goodsId:"",
        company:"",
        backDate:"",
        area:"",
        storePlace:"",
        remark:"",
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
    handleContextMenu(row) {
      const index = this.data1.findIndex(item => item.name === row.name)
      this.contextLine = index + 1
    },
    handleContextMenuEdit() {
      this.$Message.info('Click edit of line' + this.contextLine)
    },
    handleContextMenuDelete() {
      this.$Message.info('Click delete of line' + this.contextLine)
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
      let url="/backRecord/add";
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
      if (pageNum){
        this.pageNum=pageNum;
      }
      let params={
        current:this.pageNum,
        size:this.pageSize,
        searchKey:this.searchKey,
        company:this.company
      }
      let that =this;
      let url="/backRecord/list";
      console.log("params"+JSON.stringify(params));
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
      this.recordObj.backDate=val;
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