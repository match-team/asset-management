<template>
  <div class="container">
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
      <div>
        <Button type="info" style="margin-right: 10px" @click="Importfile">导入</Button>
        <Button type="success">导出</Button>
      </div>
    </div>
    <Table
      class="mygrid"
      :loading="loadingTable"
      border
      :columns="columnsTable"
      :data="tableList"
    ></Table>
    <Page :total="100" show-elevator class="pagenation" />
    <Modal v-model="modalShow" title="新建入库" @on-ok="handleAdd" @on-cancel="cancel" width="900">
      <Row :gutter="16">
        <Col span="12"><label>资产编号：</label><Input v-model="formModal.goodsNum" /></Col>
        <Col span="12"><label>资产类别：</label><Input v-model="formModal.goodsType" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>资产名称：</label><Input v-model="formModal.goodsName" /></Col>
        <Col span="12"><label>标准型号：</label><Input v-model="formModal.standardModel" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>计量单位：</label><Input v-model="formModal.meteringUnit" /></Col>
        <Col span="12"><label>规格型号：</label><Input v-model="formModal.specsModel" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>来源：</label><Input v-model="formModal.source" /></Col>
        <Col span="12"
          ><label>购入日期：</label>
          <DatePicker v-model="formModal.buyTime" type="date"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>所属公司：</label><Input v-model="formModal.ownerCompany" /></Col>
        <Col span="12"><label>金额：</label><Input v-model="formModal.price" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>管理员：</label><Input v-model="formModal.adminId" /></Col>
        <Col span="12"
          ><label>使用期限：</label>
          <DatePicker v-model="formModal.usedDate" type="date"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>存放地点：</label><Input v-model="formModal.store_place" /></Col>
        <Col span="12"><label>创建人：</label><Input v-model="formModal.createUser" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"
          ><label>创建时间：</label>

          <DatePicker v-model="formModal.createTime" type="date"></DatePicker>
        </Col>
        <Col span="12"><label>备注：</label><Input v-model="formModal.remark" /></Col>
      </Row>

      <Row :gutter="16" v-if="newAttribute.length > 0">
        <Col span="12" v-for="(item, index) in newAttribute" :key="index">
          <label>{{ item[`prop${index}`] }}:</label>
          <Input :value="inputProp" @on-change="handleInput(index)" ref="input1"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="24">上传图片:</Col>
        <Col span="24">
          <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
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
          <Modal title="View Image" v-model="visible">
            <img
              :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
              v-if="visible"
              style="width: 100%"
            />
          </Modal>
        </Col>
      </Row>
      <Row class="add_attribute">
        <Col span="24"
          ><Button type="info" ghost @click="addattributeModal = true">添加新属性</Button></Col
        >
      </Row>
    </Modal>
    <Modal
      v-model="addattributeModal"
      title="添加新属性"
      @on-ok="addattributeModalAdd"
      @on-cancel="cancel"
    >
      <Row>
        <Col span="24"><label>属性名称：</label><Input v-model="newValue" /></Col>
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
import { getwarehousingList, warehousingAdd } from '@/api/warehousing'

let attributeIndex = -1
export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      inputProp: '',
      //新添加的属性

      newAttribute: [],
      loadingTable: false,
      ownerCompany: '',
      searchKey: '',
      formModal: {
        goodsNum: '',
        goodsType: '',
        goodsName: '',
        standardModel: '',
        meteringUnit: '',
        specsModel: '',
        source: '',
        buyTime: '',
        ownerCompany: '',
        price: '',
        adminId: '',

        usedDate: '',
        store_place: '',
        createUser: '',
        createTime: '',
        remark: ''
      },
      value: '',
      fileVisible: false,
      addattributeModal: false,
      modalShow: false,
      pageNum: 1,
      pageSize: 10,
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
      tableList: [],
      defaultList: [
        {
          name: 'a42bdcc1178e62b4694c830f028db5c0',
          url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          name: 'bc7521e033abdd1e92222d733590f104',
          url: 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      newValue: ''
    }
  },

  mounted() {
    this.getList()
  },
  beforeDestroy() {},
  methods: {
    largeModalAdd() {
      this.modalShow = true
      this.newAttribute = []
      attributeIndex = -1
      this.newValue = ''
    },
    handleInput(index) {
      console.log(index)
      let value = this.$refs.input1[0].currentValue
      console.log(value)
      this.newAttribute[index][`prop${index}`] = this.$refs.input1[0].currentValue
      console.log(this.newAttribute)
    },
    ok() {},
    async handleAdd() {
      // console.log(this.newAttribute)
      const res = await warehousingAdd(this.formModal)
      console.log(res)
    },
    cancel() {},
    async getList() {
      this.loadingTable = true
      try {
        const res = await getwarehousingList({
          searchKey: this.searchKey,
          ownerCompany: this.ownerCompany,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        if (res.success) {
          this.tableList = res.detail.records
        } else {
          throw new Error(res.msg || '接口返回错误')
        }
      } catch (error) {
        this.$Message.error(error.message)
      } finally {
        this.loadingTable = false
      }
    },
    handleSearch() {
      this.getList()
    },
    Importfile() {
      this.fileVisible = true
    },
    // 添加新属性
    addattributeModalAdd() {
      attributeIndex++
      let key = `prop${attributeIndex}`
      this.newAttribute.push({ [key]: this.newValue })
      // let _arr = []
      // _arr.push({ text: this.newValue })
      // attributeIndex++
      // let key = `prop${attributeIndex}`
      // this.newAttribute.push({ [key]: _arr })
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
    //上传图片
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