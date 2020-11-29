<template>
  <div id="app">
    <main-layout v-if="this.$route.fullPath!='/login'"/>
    <login v-if="this.$route.fullPath=='/login'" />
  </div>
</template>

<script>
import MainLayout from '@/layout/Main'
import Login from "@/views/login/login";
export default {
  name: 'App',
  components: {
    Login,
    MainLayout
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  height: 100%;
}
.container {
  background: #fff;
  padding: 20px 10px;
  margin: 10px;
  overflow-y: auto;
}
.pagenation {
  margin: 30px 0;
}
</style>
