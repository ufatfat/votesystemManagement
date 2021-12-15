<template>
  <div style="display: flex; justify-content: space-between; margin: -20px; height: calc(100vh - 60px);">
    <div style="width: 150px; height: 100%; background: #ffffff;">
      <el-menu default-active="general" router>
        <el-menu-item index="general">
          <span slot="title">通用</span>
        </el-menu-item>
        <el-menu-item index="pages">
          <span slot="title">页面</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="width: calc(100vw - 180px)">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "System",
  data () {
    return {
      html: "",
    }
  },
}
</script>

<style scoped>

</style>