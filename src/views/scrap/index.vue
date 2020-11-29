
<!-- 报废页面 -->

<template>
  <div class="container">
      
        <!-- 顶部栏 -->
        <div class="scrap1 margin-bottom-15">
            <Select class="width-200 margin-right-15" placeholder="请选择部门">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <Input class="width-200 margin-right-15" placeholder="请输入关键字"></Input>
            <Button>查询</Button>
            <!-- 右侧4个按钮 -->
            <div class="scrap2">
                <Button class="margin-right-15">新建</Button>
                <Button class="margin-right-15">打印</Button>
                <Button class="margin-right-15">导入</Button>
                <Button class="margin-right-15">一键转卖</Button>
            </div>
        </div>
        
        <!-- 表格内容 -->
        <Table border :columns="columns2" :data="data3"></Table>
        <Page :total="100" show-elevator class="pagenation" />
        
        <!-- 弹窗-报废功能确认流程 -->
        <Modal v-model="modalShow" title="报废" width="900">
          
          <Row :gutter="16">
              <Col span="12" ><label>报废单号：</label><Input  /></Col>
              <Col span="12" ><label>报废日期：</label><Input  /></Col>
          </Row>
          <Row :gutter="16">
              <Col span="12"><label>所属公司/部门：</label><Input  /></Col>
              <Col span="12"><label>申请人：</label><Input  /></Col>
          </Row>
          <Row :gutter="16">
              <Col span="12">
                  <label>报废说明：</label>
                  <Select placeholder="报废物资">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
              </Col>
              <Col span="12"><label>资产编号：</label><Input  /></Col>
          </Row>
          
        </Modal>
        
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
        
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      modalShow: false,
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
            type: 'selection',
            width:60
        },
        {
          title: '报废单号',
          key: 'name'
        },
        {
          title: '办理状态',
          key: 'age',
        },
        {
          title: '报废日期',
          key: 'province',
        },
        {
          title: '申请人',
          key: 'city',
        },
        {
          title: '报废说明',
          key: 'address',
        },
        {
          title: '备注',
          key: 'zip',
        },
        {
          title: '资产编号',
          key: 'zip1',
        },
        {
          title: '操作',
          key: 'action',
          width: 260,
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
                  }
                },
                '驳回'
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
                  }
                },
                '修改'
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
      ],
      data3: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
          zip1:'test'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'Washington, D.C. No. 1 Lake Park',
          province: 'America',
          city: 'Washington, D.C.',
          zip: 100000,
          zip1:'test'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          province: 'Australian',
          city: 'Sydney',
          zip: 100000,
          zip1:'test'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          province: 'Canada',
          city: 'Ottawa',
          zip: 100000,
          zip1:'test'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
      //弹窗-上传文件
      ok() {},
      cancel() {},
      
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
        width: 140px;
      }
    }
    
</style>