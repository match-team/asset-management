<template>
  <aside class="platform-sidebar">
    <Menu theme="dark" :active-name="pageMark" @on-select="handleSelect">
      <img src="/gdzcgl/imgs/ouyeellogo.png" class="img-logo" />
      <router-link to="platform">
        <MenuItem name="资产入库">
          <Icon type="md-document" />
          资产入库
        </MenuItem>
      </router-link>

      <router-link to="bill">
        <MenuItem name="资产入账">
          <Icon type="md-heart" />
          资产入账
        </MenuItem>
      </router-link>
      <router-link to="give">
        <MenuItem name="资产领用">
          <Icon type="md-chatbubbles" />
          资产领用
        </MenuItem>
      </router-link>
      <router-link to="back">
        <MenuItem name="资产退库"> <Icon type="md-albums" />资产退库 </MenuItem>
      </router-link>

      <router-link to="servicing">
        <MenuItem name="维修管理">
          <Icon type="md-bookmarks" />
          维修管理
        </MenuItem>
      </router-link>
      <router-link to="inventory">
        <MenuItem name="盘点管理">
          <Icon type="md-leaf" />
          盘点管理
        </MenuItem>
      </router-link>
      <router-link to="scrap">
        <MenuItem name="报废处理">
          <Icon type="md-color-palette" />
          报废处理
        </MenuItem>
      </router-link>
    </Menu>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      pageMark: '资产入库',
      theme2: 'light'
    }
  },
  methods: {
    handleSelect(name) {
      this.pageMark = name
    }
  },
  mounted() {
    this.pageMark = this.$route.meta.name
  }
}
</script>
<style lang="less" scoped>
.img-logo {
  position: relative;
  left: 40px;
  margin: 10px 0;
  width: 56%;
}
a {
  color: #eee;
}
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