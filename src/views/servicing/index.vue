
<!-- 维修页面 -->

<template>
  <div class="container">
    <!-- 顶部栏 -->
    <div class="scrap1 margin-bottom-15">
      <Select class="width-200 margin-right-15" placeholder="请选择部门">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
          item.label
        }}</Option>
      </Select>
      <Input class="width-200 margin-right-15" placeholder="请输入关键字"></Input>
      <Button>查询</Button>
      <!-- 右侧2个按钮 -->
      <div class="scrap2">
        <Button class="margin-right-15">新建</Button>
      </div>
    </div>

    <!-- 表格内容 -->
    <Table border :columns="columns2" :data="data3"></Table>
    <Page :total="100" show-elevator class="pagenation" />

    <!-- 弹窗-新建 -->
    <Modal v-model="modalShow2" title="新建入库" width="900">
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
      value: '',
      modalShow2: false,
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
      //照片调试
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
      uploadList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.uploadList = this.$refs.upload.fileList
  },
  beforeDestroy() {},
  methods: {
    //图片上传
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
.width-200 {
  width: 200px;
}
.margin-right-15 {
  margin-right: 15px;
}
.scrap2 {
  float: right;
}
.margin-bottom-15 {
  margin-bottom: 15px;
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

// 图片上传
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>