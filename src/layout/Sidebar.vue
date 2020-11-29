<template>
  <aside class="platform-sidebar">
    <Menu theme="dark" :active-name="pageMark">
      <MenuGroup title="申请">
        <MenuItem name="1">
          <Icon type="md-document" />
          <router-link to="platform"> 资产入库 </router-link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="财务">
        <MenuItem name="2" @click="pageMark = '2'">
          <Icon type="md-heart" />
          <router-link to="bill"> 资产入账 </router-link>
        </MenuItem>

        <MenuItem name="3" @click="pageMark = '3'">
          <Icon type="md-chatbubbles" />
          <router-link to="give"> 资产领用 </router-link>
        </MenuItem>

        <MenuItem name="4" @click="pageMark = '4'">
          <Icon type="md-leaf" />
          <router-link to="back"> 资产退库 </router-link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="物质管理">
        <MenuItem name="5" @click="pageMark = '5'">
          <Icon type="md-heart" />
          维修管理
        </MenuItem>
        <MenuItem name="6" @click="pageMark = '6'">
          <Icon type="md-leaf" />
          盘点管理
        </MenuItem>
        <MenuItem name="7" @click="pageMark = '7'">
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
      pageMark: '1',
      theme2: 'light'
    }
  },
  methods: {}
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