<template>
  <header class="header">
    <Breadcrumb>
      <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon> 首页 </BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">
        <Icon type="logo-buffer"></Icon> 资产管理
      </BreadcrumbItem>
      <BreadcrumbItem> <Icon type="ios-cafe"></Icon> 清点数据 </BreadcrumbItem>
    </Breadcrumb>
    <Dropdown trigger="click" style="margin-left: 20px">
      <a href="javascript:void(0)" class="header-dropdown">
        <img src="../assets/images/drown.png" alt="" class="header-dropdown-img" />
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </header>
</template>

<script>
</script>

<style lang="less" scoped>
.header {
  padding: 10px;
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
