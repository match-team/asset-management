<template>
  <div class="wrapper">
    <platform-sidebar />
    <div class="container">
      <platform-header />
      <router-view />
    </div>
  </div>
</template>

<script>
import PlatformHeader from './Header'
import PlatformSidebar from './Sidebar'

export default {
  name: 'PlatformLayout',
  components: {
    PlatformSidebar,
    PlatformHeader
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.container {
  width: 98%;
}
</style>
