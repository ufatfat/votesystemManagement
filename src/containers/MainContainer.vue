<template>
  <div class="sl-body">
    <el-header>
      <Header></Header>
    </el-header>
    <div class="main-bottom">
      <Siderbar></Siderbar>
      <el-container>
        <el-main>
          <Breadcrumb></Breadcrumb>
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <!--el-footer>
          <Footer></Footer>
        </el-footer-->
      </el-container>
    </div>
    <Scrolltotop></Scrolltotop>
  </div>
</template>

<script>
export default {
  name: "MainContainer"
}
</script>

<style scoped>

</style>