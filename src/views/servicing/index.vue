
<!-- 维修页面 -->

<template>
  <div class="container">
    <!-- 顶部栏 -->
    <div class="table_top">
      <div>
        <Button type="success" @click="modalShow2 = true">新建</Button>
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
    <Page :total="100" show-elevator class="pagenation" />

    <!-- 弹窗-新建 -->
    <Modal v-model="modalShow2" title="维修新建" width="900">
      <Row :gutter="16">
        <Col span="12"><label>维修编号</label><Input v-model="value" /></Col>
        <Col span="12">
          <label style="width: 81px">业务日期</label>
          <DatePicker
            type="date"
            placeholder="请选择开始日期"
            v-model="formItem.date"
            style="width: 345px"
          ></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>处理人</label><Input v-model="value" /></Col>
        <Col span="12"><label>报修人</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>维修花费</label><Input v-model="value" /></Col>
        <Col span="12"><label>维修内容</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>备注</label><Input v-model="value" /></Col>
        <Col span="12"><label>资产编号</label><Input v-model="value" /></Col>
      </Row>
      <Row>
        <Col span="24">资产照片:</Col>
        <Col span="24">
          <div class="demo-upload-list" v-for="(item, index) in images" :key="index">
            <img
              :src="item"
              style="width: 58px; height: 58px; line-height: 58px"
              @click="handleView"
            />
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :before-upload="onBeforeUpload"
            multiple
            type="drag"
            style="display: inline-block; width: 58px"
            action="."
          >
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="图片预览" v-model="visible">
            <img :src="images[0]" v-if="visible" style="width: 100%" />
          </Modal>
        </Col>
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
      searchKey: '',
      ownerCompany: '',
      visible: false,
      uploadFileList: [],
      images: [],
      value: '',
      modalShow2: false,
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
          title: '维修编号',
          key: 'name',
          width: 100,
          fixed: 'left'
        },
        {
          title: '办理状态',
          key: 'age',
          width: 100
        },
        {
          title: '状态',
          key: 'province',
          width: 100
        },
        {
          title: '照片',
          key: 'city',
          width: 100
        },
        {
          title: '业务日期',
          key: 'address',
          width: 100
        },
        {
          title: '处理人',
          key: 'zip',
          width: 100
        },
        {
          title: '报修人',
          key: 'zip',
          width: 100
        },
        {
          title: '维修花费',
          key: 'zip',
          width: 100
        },
        {
          title: '维修内容',
          key: 'zip',
          width: 100
        },
        {
          title: '备注',
          key: 'zip',
          width: 100
        },
        {
          title: '资产编号',
          key: 'zip',
          width: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          fixed: 'right',
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '15px'
                  }
                },
                '打印'
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
                '完成维修'
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
          zip1: 'test'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'Washington, D.C. No. 1 Lake Park',
          province: 'America',
          city: 'Washington, D.C.',
          zip: 100000,
          zip1: 'test'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          province: 'Australian',
          city: 'Sydney',
          zip: 100000,
          zip1: 'test'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          province: 'Canada',
          city: 'Ottawa',
          zip: 100000,
          zip1: 'test'
        }
      ],
      //创建表单调试数据
      ruleValidate: true,
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
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},

  beforeDestroy() {},
  methods: {
    handleSearch() {},
    onBeforeUpload(file) {
      console.log(file)
      this.uploadFileList.push(file)

      const check = this.uploadFileList.length > 1
      if (check) {
        this.$Message.info('最多上传一张图片')
      }
      this.processPreviewImage()
    },
    processPreviewImage() {
      this.images = []
      let index = 0

      const reader = new FileReader()
      reader.onload = ({ target }) => {
        this.images.push(target.result)

        index++
        index < this.uploadFileList.length && reader.readAsDataURL(this.uploadFileList[index])
      }

      reader.readAsDataURL(this.uploadFileList[index])
    },
    handleView() {
      this.visible = true
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
.ivu-select {
  margin: 0 10px;
}
</style>