<template>
  <div class="container">
    <div class="table_top">
      <div>
        <Button type="success" @click="modalShow = true">新建</Button>
        <Select v-model="model1" style="width: 200px" placeholder="请选择部门">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
            item.label
          }}</Option>
        </Select>

        <Input placeholder="请输入关键字" style="width: auto; margin-right: 10px">
          <Icon type="ios-search" slot="suffix" />
        </Input>
        <Button type="info">查询</Button>
      </div>
      <div>
        <Button type="info" style="margin-right: 10px" @click="Importfile">导入</Button>
        <Button type="success">导出</Button>
      </div>
    </div>
    <Table border :columns="columns2" :data="data3"></Table>
    <Page :total="100" show-elevator class="pagenation" />
    <Modal v-model="modalShow" title="新建入库" @on-ok="ok" @on-cancel="cancel" width="900">
      <Row :gutter="16">
        <Col span="12"><label>资产编号：</label><Input v-model="value" /></Col>
        <Col span="12"><label>资产类别：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>资产名称：</label><Input v-model="value" /></Col>
        <Col span="12"><label>标准型号：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>计量单位：</label><Input v-model="value" /></Col>
        <Col span="12"><label>规格型号：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>来源：</label><Input v-model="value" /></Col>
        <Col span="12"><label>购入日期：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>所属公司：</label><Input v-model="value" /></Col>
        <Col span="12"><label>金额：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>管理员：</label><Input v-model="value" /></Col>
        <Col span="12"><label>使用期限：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>存放地点：</label><Input v-model="value" /></Col>
        <Col span="12"><label>创建人：</label><Input v-model="value" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>创建时间：</label><Input v-model="value" /></Col>
        <Col span="12"><label>备注：</label><Input v-model="value" /></Col>
      </Row>
      <Row>
        <Col span="24">上传图片:</Col>
        <Col span="24">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
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
      <Row class="add_attribute">
        <Col span="24"><Button type="info" ghost @click="Addattribute">添加新属性</Button></Col>
      </Row>
    </Modal>
    <Modal v-model="addattributeModal" title="添加新属性" @on-ok="ok" @on-cancel="cancel">
      <Row>
        <Col span="24"><label>属性名称：</label><Input v-model="value" /></Col>
      </Row>
    </Modal>
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
      fileVisible: false,
      addattributeModal: false,
      modalShow: false,
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
          title: '资产编号',
          key: 'name',
          width: 100,
          fixed: 'left'
        },
        {
          title: '资产类别',
          key: 'age',
          width: 100
        },
        {
          title: '资产名称',
          key: 'province',
          width: 100
        },
        {
          title: '标准型号',
          key: 'city',
          width: 100
        },
        {
          title: '计量单位',
          key: 'address',
          width: 200
        },
        {
          title: '规格型号',
          key: 'zip',
          width: 100
        },
        {
          title: '购入日期',
          key: 'zip',
          width: 100
        },
        {
          title: '所属公司',
          key: 'zip',
          width: 100
        },
        {
          title: '金额',
          key: 'zip',
          width: 100
        },

        {
          title: '管理员',
          key: 'zip',
          width: 100
        },
        {
          title: '使用期限',
          key: 'zip',
          width: 100
        },
        {
          title: '存放地点',
          key: 'zip',
          width: 100
        },
        {
          title: '创建人',
          key: 'zip',
          width: 100
        },
        {
          title: '创建时间',
          key: 'zip',
          width: 100
        },
        {
          title: '备注',
          key: 'zip',
          width: 100
        },
        {
          title: '附件',
          key: 'zip',
          width: 100
        },
        {
          title: '来源',
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
      ],
      data3: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'Washington, D.C. No. 1 Lake Park',
          province: 'America',
          city: 'Washington, D.C.',
          zip: 100000
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          province: 'Australian',
          city: 'Sydney',
          zip: 100000
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          province: 'Canada',
          city: 'Ottawa',
          zip: 100000
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
    Importfile() {
      this.fileVisible = true
    },
    Addattribute() {
      this.addattributeModal = true
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
.ivu-select {
  margin: 0 10px;
}
</style>