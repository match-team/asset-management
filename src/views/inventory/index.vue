
<!-- 盘点页面 -->
<template>
  <div class="container">
    <!-- 顶部栏 -->
    <div class="table_top">
      <div>
        <Button type="success" @click="largeModalAdd">新建</Button>
        <Select v-model="ownerCompany" style="width: 200px" placeholder="请选择部门">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
            item.label
          }}</Option>
        </Select>

        <Input
          v-model="searchKey"
          placeholder="请输入关键字"
          style="width: auto; margin-right: 10px"
        >
          <Icon type="ios-search" slot="suffix" />
        </Input>
        <Button type="info" @click="handleSearch">查询</Button>
      </div>
    </div>

    <!-- 表格内容 -->
    <Table border :columns="columns2" :data="data3"></Table>
    <Page
      :total="pages"
      :current="pageNum"
      :page-size="pageSize"
      @on-change="changePageNum"
      show-total
      class="pagenation"
    />

    <!-- 弹窗-新建 -->
    <Modal v-model="modalShow2" title="新建盘点" width="900">
      <Row :gutter="16">
        <Col span="12"
          ><label>盘点名称：<span style="color: red">*</span></label
          ><Input v-model="value"
        /></Col>
        <Col span="12"><label>备注：</label><Input v-model="value" /></Col>
      </Row>

      <Row :gutter="16">
        <Col span="12"
          ><label
            style="
              display: block;
              height: 32px;
              width: 100px;
              background-color: #7b88ff;
              color: white;
              line-height: 32px;
              text-align: center;
              margin: 15px 0px;
            "
            >盘点范围</label
          ></Col
        >
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <label>盘点时间：</label>
          <DatePicker type="date" placeholder="请选择开始日期" v-model="formItem.date"></DatePicker>
        </Col>
        <Col span="12">
          <label>部门：</label>
          <Select placeholder="请选择部门">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
              item.label
            }}</Option>
          </Select>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <label>所属公司：</label>
          <Select placeholder="请选择所属公司">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
              item.label
            }}</Option>
          </Select>
        </Col>
        <Col span="12">
          <label>资产分类：</label>
          <Input v-model="value" />
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <label>区域：</label>
          <Input v-model="value" />
        </Col>
        <Col span="12" style="margin-bottom: 40px">
          <label>管理员：</label>
          <Input v-model="value" />
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="handleAdd">确定</Button>
        <Button @click="modalShow2 = false">取消</Button>
      </div>
    </Modal>
    <!-- 盘点明细 -->
    <Modal v-model="detailShow" title="盘点明细" @on-ok="ok" @on-cancel="cancel">
      <Row>
        <Col span="12">状态：</Col>
        <Col span="12">资产编号：{{ detailArr.goodsNum }}</Col>
      </Row>
      <Row>
        <Col span="12">资产类别：{{ detailArr.goodsType }}</Col>
        <Col span="12">资产名称：{{ detailArr.goodsName }}</Col>
      </Row>
      <Row>
        <Col span="12">标准型号：{{ detailArr.standardModel }}</Col>
        <Col span="12">计量单位：{{ detailArr.goometeringUnitdsNum }}</Col>
      </Row>
      <Row>
        <Col span="12">规格型号：{{ detailArr.specsModel }}</Col>
        <Col span="12">购入日期：{{ detailArr.buyTime }}</Col>
      </Row>
      <Row>
        <Col span="12">所属公司：{{ detailArr.ownerCompany }}</Col>
        <Col span="12">使用部门：{{ detailArr.department }}</Col>
      </Row>
      <Row>
        <Col span="12">使用人：{{ detailArr.ownerId }}</Col>
        <Col span="12">管理员：{{ detailArr.adminId }}</Col>
      </Row>
      <Row>
        <Col span="12">存放地点：{{ detailArr.store_place }}</Col>
        <Col span="12">备注：{{ detailArr.remark }}</Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import axios from '../../utils/axios.js'
import { inventoryDetail } from '@/api/warehousing.js'

export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      searchKey: '',
      ownerCompany: '',
      value: '',
      modalShow2: false,
      fileVisible: false,
      cityList: [
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
      ],
      model1: '',

      columns2: [
        {
          title: '盘点单名称',
          key: 'content'
        },
        {
          title: '分配用户',
          key: 'createUserName'
        },
        {
          title: '创建人',
          key: 'createUserid'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '判断报告',
          key: 'report'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
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
                  on: {
                    click: () => {
                      this.detailShow = true
                      this.pdDetail(params)
                    }
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
          zip1: 'test'
        }
      ],
      //盘点弹窗
      detailShow: false,
      //盘点明细数据
      detailArr: {},
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
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    //初始化读取列表
    this.queryPage(1)
  },
  beforeDestroy() {},
  methods: {
    //盘点明细
    async pdDetail(params) {
      console.log(params.row.id)
      let id = params.row.id
      const res = await inventoryDetail(id)

      this.detailArr = res.detail.checkDetail[0].goodsRecord
      console.log(this.detailArr)
    },
    //切换新建弹窗
    largeModalAdd() {
      this.modalShow2 = true
    },
    handleSearch() {
      this.queryPage()
    },
    //新建
    handleAdd() {},
    //分页器改变
    changePageNum(num) {
      this.queryPage(num)
    },

    //分页查询
    queryPage(pageNum) {
      if (pageNum) {
        this.pageNum = pageNum
      }
      let params = {
        page: this.pageNum,
        limit: 10
      }
      let that = this
      let url = '/rest/check/list'
      console.log('params' + JSON.stringify(params))
      axios.get(url, { params: params }).then(
        function (r) {
          if (r.success) {
            that.data3 = r.detail.records
            that.pages = r.detail.total
            return
          }
          that.$Notice.error({ title: '错误', desc: r.msg })
        },
        function (e) {
          console.log(e)
          that.$Notice.error({ title: '错误', desc: '系统异常' })
        }
      )
    },

    //弹窗-上传文件
    ok() {},
    cancel() {},

    //表单调试函数
    remoteMethod4(query) {
      if (query !== '') {
        this.loading4 = true
        setTimeout(() => {
          this.loading4 = false
          this.options4 = this.list2.filter(item => item.label.indexOf(query) > -1)
        }, 200)
      } else {
        this.options4 = []
      }
    },
    setDefaultOptions(options) {
      this.options4 = options
    },
    //表单提交的两个按钮
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('成功!')
        } else {
          this.$Message.error('请完善表格!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ivu-table-header thead tr th,
/deep/ .ivu-table-fixed-header thead tr th {
  text-align: center;
}
/deep/ .ivu-date-picker {
  width: 100%;
}
.table_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
.table_top .ivu-select {
  margin: 0 10px;
}
</style>