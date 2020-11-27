<template>
  <aside class="platform-sidebar">
    <Menu theme="dark" active-name="1">
      <MenuGroup title="申请">
        <MenuItem name="1">
          <Icon type="md-document" />
          采购申请
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="财务">
        <MenuItem name="3">
          <Icon type="md-heart" />
          财务入账
        </MenuItem>
        <MenuItem name="2">
          <Icon type="md-chatbubbles" />
          资产入库
        </MenuItem>
        <MenuItem name="4">
          <Icon type="md-leaf" />
          物质领用
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="物质管理">
        <MenuItem name="3">
          <Icon type="md-heart" />
          维修管理
        </MenuItem>
        <MenuItem name="4">
          <Icon type="md-leaf" />
          盘点管理
        </MenuItem>
        <MenuItem name="4">
          <Icon type="md-leaf" />
          报废处理
        </MenuItem>
      </MenuGroup>
    </Menu>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      theme2: 'light'
    }
  }
}
</script>
<style lang="less" scoped>
.platform-sidebar {
  background-color: #ffffff;
  border-radius: 2px;
  height: 100%;
  overflow: hidden;

  /deep/ .ivu-menu {
    height: 100%;
  }
}
</style>