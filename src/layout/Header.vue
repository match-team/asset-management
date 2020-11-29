<template>
  <header class="header">
    <Breadcrumb>
      <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon> 首页 </BreadcrumbItem>
      <BreadcrumbItem :to="breadcrumb.path">
        <Icon type="logo-buffer"></Icon>{{ breadcrumbName }}
      </BreadcrumbItem>
    </Breadcrumb>
    <Dropdown trigger="click" style="margin-left: 20px">
      <a href="javascript:void(0)" class="header-dropdown">
        <img src="../assets/images/drown.png" alt="" class="header-dropdown-img" />
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>欧冶云商</DropdownItem>
        <DropdownItem>欧冶采购</DropdownItem>
        <DropdownItem>欧冶物流</DropdownItem>
        <DropdownItem>东方钢铁</DropdownItem>
        <DropdownItem>欧冶金融</DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
  mounted() {
    this.breadcrumb = JSON.parse(localStorage.getItem('breadcrumb'))
    this.breadcrumbName = this.breadcrumb.meta.name
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
