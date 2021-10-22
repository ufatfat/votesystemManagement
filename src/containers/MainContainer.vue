<template>
  <div class="sl-body">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container style="position: absolute; top: 60px; left: 0; width: 100%;">
      <el-main>
        <router-view></router-view>
      </el-main>
      <!--el-footer>
        <Footer></Footer>
      </el-footer-->
    </el-container>
<!--    <Scrolltotop></Scrolltotop>-->
  </div>
</template>

<script>
import Header from "../components/header/Header"

export default {
  name: "MainContainer",
  components: {Header},
}
</script>

<style scoped>

</style>