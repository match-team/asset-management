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
    </div>
    <Table class="mygrid" :loading="loadingTable" border :columns="columnsTable" :data="tableList">
    </Table>
    <Page
      height="400"
      :total="pages"
      :current="current"
      :page-size="size"
      @on-change="changePageNum"
      show-elevator
      class="pagenation"
    />
    <Modal v-model="modalShow" title="新建入库" width="900">
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
          <DatePicker :editable="false" v-model="formModal.buyTime" type="date"></DatePicker>
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
          <DatePicker :editable="false" v-model="formModal.usedDate" type="date"></DatePicker>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"><label>存放地点：</label><Input v-model="formModal.storePlace" /></Col>
        <Col span="12"><label>创建人：</label><Input v-model="formModal.createUser" /></Col>
      </Row>
      <Row :gutter="16">
        <Col span="12"
          ><label>创建时间：</label>

          <DatePicker :editable="false" v-model="formModal.createTime" type="date"></DatePicker>
        </Col>
        <Col span="12"><label>备注：</label><Input v-model="formModal.remark" /></Col>
      </Row>

      <Row :gutter="16" v-if="newAttribute.length > 0">
        <Col span="12" v-for="(item, index) in newAttribute" :key="index">
          <label>{{ item[`pro${index + 1}Desc`] }}:</label>
          <Input @on-change="handleInput(index)" ref="input1"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="24">上传图片:</Col>
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
      <Row class="add_attribute">
        <Col span="24"
          ><Button type="info" ghost @click="addattributeModal = true">添加新属性</Button></Col
        >
      </Row>
      <div slot="footer">
        <Button type="primary" @click="handleAdd">确定</Button>
        <Button @click="modalShow = false">取消</Button>
      </div>
    </Modal>
    <Modal v-model="addattributeModal" title="添加新属性">
      <Row>
        <Col span="24"><label>属性名称：</label><Input v-model="newValue" /></Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="confirmSx">确定</Button>
        <Button @click="addattributeModal = false">取消</Button>
      </div>
    </Modal>

    <Modal title="附件图片预览" v-model="fjvisible">
      <img id="printTest" :src="fjUrl" style="width: 100%" />

      <div slot="footer">
        <Button type="primary" v-if="isDayin" v-print="'#printTest'" @click="dayin">打印</Button>
        <Button type="primary" @click="fjvisible = false">确定</Button>
        <Button @click="fjvisible = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
import { getwarehousingList, warehousingAdd } from '@/api/warehousing'

// import { deepClone } from '@/utils/deepClone'
let attributeIndex = 0
let _arr = []

export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      //是否打印
      isDayin: false,
      //附件图片预览
      fjvisible: false,
      fjUrl: '',
      pages: 10,
      uploadFileList: [],
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
        storePlace: '',
        createUser: '',
        createTime: '',
        remark: ''
      },
      value: '',
      fileVisible: false,
      addattributeModal: false,
      modalShow: false,
      current: 1,
      size: 7,
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
          title: '动态属性',
          key: 'searchKeyValue',
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
          width: 100
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
          key: 'storePlace',
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let str = params.row.filePaths
                      let strs = str.slice(0, str.length - 1)
                      console.log(strs)

                      this.fjvisible = true
                      this.fjUrl = `http://10.60.17.43:8080/gdzcgl/${strs}`
                      console.log(this.fjUrl)
                    }
                  }
                },
                params.row.filePaths
              )
            ])
          }
        },
        {
          title: '二维码',
          key: 'qrImg',
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let str = params.row.qrImg
                      this.fjvisible = true
                      this.isDayin = true
                      this.fjUrl = `http://10.60.17.43:8080/gdzcgl/upload/${str}`
                    }
                  }
                },
                '二维码'
              )
            ])
          }
        }
      ],
      tableList: [],
      visible: false,
      uploadList: [],
      newValue: '',
      images: []
    }
  },

  mounted() {
    this.getList()
  },
  beforeDestroy() {},
  methods: {
    //打印
    dayin() {
      this.fjvisible = false
    },
    //添加属性弹窗
    confirmSx() {
      attributeIndex++
      let key = `pro${attributeIndex}Desc`
      let key1 = `pro${attributeIndex}`
      this.newAttribute.push({ [key]: this.newValue })
      _arr.push({ [key]: this.newValue, [key1]: '属性值' })
      this.newValue = ''
      this.addattributeModal = false
    },
    largeModalAdd() {
      this.modalShow = true
      this.newAttribute = []
      attributeIndex = 0
      this.newValue = ''
    },
    changePageNum(page) {
      this.getList(page)
    },
    handleInput(index) {
      // des:属性名
      // _arr = deepClone(this.newAttribute)

      let value = this.$refs.input1[index].currentValue
      let key = `pro${index + 1}`

      // const findIndex = _arr.findIndex(item => {
      //   console.log(item)
      //   item[`prop${index}`] == `prop${index}`
      // })
      // console.log(findIndex, 'findIndex')
      // this.newAttribute.push({ [key]: value })
      // _arr.push({ [key]: value })
      _arr[index][key] = value
      console.log(_arr)
    },
    // 新建
    async handleAdd() {
      this.formModal.createTime = moment(this.formModal.createTime).format('YYYY-MM-DD')
      this.formModal.buyTime = moment(this.formModal.buyTime).format('YYYY-MM-DD')
      this.formModal.usedDate = moment(this.formModal.usedDate).format('YYYY-MM-DD')
      const formData = new FormData()
      formData.append('files', this.uploadFileList[0])
      for (let key in this.formModal) {
        formData.append(key, this.formModal[key])
      }
      _arr.forEach(item => {
        for (let key in item) {
          formData.append(key, item[key])
        }
      })

      const res = await warehousingAdd(formData)
      console.log(res)
      if (res.success) {
        this.$Message.success('新建成功')

        this.modalShow = false

        this.getList()
      } else {
        this.$Message.error(res.msg)
      }
    },
    async getList(page) {
      this.loadingTable = true
      try {
        const res = await getwarehousingList({
          searchKey: this.searchKey,
          ownerCompany: this.ownerCompany,
          size: this.size,
          current: page || this.current
        })
        if (res.success) {
          this.tableList = res.detail.records
          this.pages = Number(res.detail.total)

          // this.tableList.forEach(item => {
          // for (let key in item) {
          //   this.columnsTable.push({
          //     title: key,
          //     key: key,
          //     width: 100,
          //     fixed: 'left'
          //   })
          // }
          // })
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

    onBeforeUpload(file) {
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