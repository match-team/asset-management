<template>
  <header class="header">
    <Breadcrumb>
      <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon> 首页 </BreadcrumbItem>
      <BreadcrumbItem :to="breadcrumb.path">
        <Icon type="logo-buffer"></Icon>{{ breadcrumbName }}
      </BreadcrumbItem>
    </Breadcrumb>
  </header>
</template>

<script>
export default {
  name: 'index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      breadcrumb: {},
      breadcrumbName: ''
    }
  },
  watch: {
    $route() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.breadcrumb = JSON.parse(localStorage.getItem('breadcrumb'))
      this.breadcrumbName = this.breadcrumb.meta.name
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  &-dropdown {
    display: flex;
    align-items: center;
    &-img {
      width: 36px;
    }
  }
}
</style>
