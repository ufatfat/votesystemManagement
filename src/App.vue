<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getConfig} from "./apis";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters([
        "config"
    ])
  },
  methods: {
    ...mapMutations([
        "updateConfig"
    ])
  },
  mounted() {
    this.axios.get("/contest_id").then(res => {
      this.axios.defaults.headers["ContestID"] = res.data.contest_id
      getConfig().then(res => {
        let d = res.data
        d.config = JSON.parse(d.config)
        this.updateConfig(d)
      })
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
