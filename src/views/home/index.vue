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
    <Table class="mygrid" border :columns="columnsTable" :data="tableList"></Table>
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
import { getwarehousingList } from '@/api/warehousing'
export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      value: '',
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

      columnsTable: [
        {
          title: '资产编号',
          key: 'goodsNum',
          width: 100,
          fixed: 'left'
        },
        {
          title: '资产类别',
          key: 'goodsType',
          width: 100
        },
        {
          title: '资产名称',
          key: 'goodsName',
          width: 100
        },
        {
          title: '标准型号',
          key: 'standardModel',
          width: 100
        },
        {
          title: '计量单位',
          key: 'meteringUnit',
          width: 200
        },
        {
          title: '规格型号',
          key: 'specsModel',
          width: 100
        },
        {
          title: '来源',
          key: 'source',
          width: 100
        },
        {
          title: '购入日期',
          key: 'buyTime',
          width: 200
        },
        {
          title: '所属公司',
          key: 'ownerCompany',
          width: 100
        },
        {
          title: '金额',
          key: 'price',
          width: 100
        },

        {
          title: '管理员',
          key: 'adminId',
          width: 100
        },
        {
          title: '使用期限',
          key: 'usedDate',
          width: 200
        },
        {
          title: '存放地点',
          key: 'store_place',
          width: 100
        },
        {
          title: '创建人',
          key: 'createUser',
          width: 100
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 200
        },
        {
          title: '备注',
          key: 'remark',
          width: 100
        },
        {
          title: '附件',
          key: 'filePaths',
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
      ],
      tableList: []
    }
  },

  mounted() {
    this.getList()
  },
  beforeDestroy() {},
  methods: {
    ok() {},
    cancel() {},
    async getList() {
      const res = await getwarehousingList()
      console.log(res)
      this.tableList = res.data.records
      console.log(this.tableList)
    },
    Importfile() {
      this.fileVisible = true
    },
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess(res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
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
/deep/ .ivu-table-header thead tr th,
.ivu-table-header thead tr th {
  text-align: center;
}

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