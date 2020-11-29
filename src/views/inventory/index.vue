
<!-- 盘点页面 -->

<template>
  <div class="container">
      
        <!-- 顶部栏 -->
        <div class="scrap1 margin-bottom-15">
            <Select class="width-200 margin-right-15" placeholder="请选择部门">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <Input class="width-200 margin-right-15" placeholder="请输入关键字"></Input>
            <Button>查询</Button>
            <!-- 右侧2个按钮 -->
            <div class="scrap2">
                <Button class="margin-right-15" @click="toggleCreateNew">新建</Button>
                <Button class="margin-right-15">导入</Button>
            </div>
        </div>
        
        <!-- 表格内容 -->
        <Table border :columns="columns2" :data="data3"></Table>
        <Page :total="pages" :current="pageNum" :page-size="pageSize" @on-change="changePageNum" show-total class="pagenation"  />
        
        <!-- 弹窗-导入文件 -->
        <Modal v-model="fileVisible" title="导入文件" @on-ok="ok" @on-cancel="cancel">
          <Row>
            <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽到这里上传</p>
              </div>
            </Upload>
          </Row>
        </Modal>
        
        <!-- 弹窗-新建 -->
        <Modal v-model="modalShow2" title="新建入库"  width="900">
          <Row :gutter="16">
            <Col span="12"><label>盘点单名称<span style="color: red;">*</span></label><Input v-model="value" /></Col>
            <Col span="12"><label>分配用户<span style="color: red;">*</span></label>
                <Select
                    v-model="model20"
                    multiple
                    filterable
                    :remote-method="remoteMethod4"
                    :default-label="['北京', '深圳']"
                    :loading="loading4"
                    @on-set-default-options="setDefaultOptions"
                >
                    <Option v-for="(option, index) in options4" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12"><label>备注</label><Input v-model="value" /></Col>
          </Row>
          <Row :gutter="16">
            <Col span="12"><label style="display: block;height: 32px;width: 100px;background-color: #7b88ff;color: white;line-height: 32px;text-align: center;margin: 15px 0px;">盘点范围</label></Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
                <label>计量单位：</label>
                <span style="display: inline-block;">
                    <Col span="11">
                        <DatePicker type="date" placeholder="请选择开始日期" v-model="formItem.date"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <DatePicker type="date" placeholder="请选择截止时间" v-model="formItem.date2"></DatePicker>
                    </Col>
                </span>
            </Col>
            <Col span="12">
                <label>公司和部门</label>
                <Select placeholder="请选择公司和部门">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
                <label>所属公司</label>
                <Select placeholder="请选择所属公司">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </Col>
            <Col span="12">
                <label>资产分类</label>
                <Select placeholder="请选择资产分类">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
                <label>区域</label>
                <Select placeholder="请选择区域">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </Col>
            <Col span="12" style="margin-bottom: 40px;">
                <label>管理员：</label>
                <Select
                    v-model="model20"
                    multiple
                    filterable
                    :remote-method="remoteMethod4"
                    :default-label="['北京', '深圳']"
                    :loading="loading4"
                    @on-set-default-options="setDefaultOptions"
                >
                    <Option v-for="(option, index) in options4" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
                <span style="display: block;position: absolute;top: 32px;left: 90px;">注意：不选范围默认为有权限的全部资产</span>
            </Col>
            
          </Row>
        </Modal>
        
  </div>
</template>

<script>
import axios from '../../utils/axios.js'    
// import { getinventoryList } from '../../api/inventory/inventory.js'
    
export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      value: '',
      modalShow: false,
      modalShow2: false,
      fileVisible: false,
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
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
      ],
      model1: '',

      columns2: [
        {
          title: '盘点单名称',
          key: 'content'
        },
        {
          title: '分配用户',
          key: 'createUserName',
        },
        {
          title: '创建人',
          key: 'createUserid',
        },
        {
          title: '创建时间',
          key: 'createTime',
        },
        {
          title: '状态',
          key: 'status',
        },
        {
          title: '判断报告',
          key: 'report',
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
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
                '盘点明细'
              )
            ])
          }
        }
      ],
      data3: [
        {
          name: 'John Brown',
          createUserid: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
          zip1:'test'
        }
      ],
      
      //分页器数据
      pages: 0,
      pageNum: 1,
      pageSize: 10,
      
      //创建表单调试数据
      formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          date2: '',
          time: '',
          slider: [20, 50],
          textarea: ''
      },
      //创建表单调试数据
      model20: ['beijing', 'shenzhen'],
      options4: [],
      loading4: false,
      list2: [
          {
              value: 'beijing',
              label: '北京'
          },
          {
              value: 'shanghai',
              label: '上海'
          },
          {
              value: 'shenzhen',
              label: '深圳'
          },
          {
              value: 'hangzhou',
              label: '杭州'
          },
          {
              value: 'guangzhou',
              label: '广州'
          }
      ],
      formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
      
      //初始化读取列表
      this.queryPage(1);
      
  },
  beforeDestroy() {},
  methods: {
      
      //切换新建弹窗
      toggleCreateNew(){
          this.modalShow2 = true;
      },
      
      //分页器改变
      changePageNum(num){
          this.queryPage(num);
      },
      
      //分页查询
      queryPage(pageNum){
        if (pageNum){
          this.pageNum=pageNum;
        }
        let params={
          page:this.pageNum,
          limit: 10
        }
        let that =this;
        let url="/rest/check/list";
        console.log("params"+JSON.stringify(params));
        axios.get(url,{params:params}).then(function (r){
          if (r.success){
              that.data3 = r.detail.records
              that.pages=r.detail.total;
              return;
          }
          that.$Notice.error({title: '错误', desc: r.msg});
        },function (e){
          console.log(e);
          that.$Notice.error({title: '错误', desc: '系统异常'});
        })
      },
      
      //弹窗-上传文件
      ok() {},
      cancel() {},
      
      //表单调试函数
      remoteMethod4 (query) {
          if (query !== '') {
              this.loading4 = true;
              setTimeout(() => {
                  this.loading4 = false;
                  this.options4 = this.list2.filter(item => item.label.indexOf(query) > -1);
              }, 200);
          } else {
              this.options4 = [];
          }
      },
      setDefaultOptions (options) {
          this.options4 = options;
      },
      //表单提交的两个按钮
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$Message.success('成功!');
              } else {
                  this.$Message.error('请完善表格!');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      }
      
  }
}
</script>

<style lang="less" scoped>
    .width-200 {width: 200px;}
    .margin-right-15 {margin-right: 15px;}
    .scrap2 {float: right;}
    .margin-bottom-15 {margin-bottom: 15px;}
    
    
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