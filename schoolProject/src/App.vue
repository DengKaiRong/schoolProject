<template>
  <div>
    <!--顶部-->
    <div class="xyhead"><img src="./assets/images/logo1-default.png"/></div>
    <!--左侧导航-->
    <div class="xynav">
      <div class="xynavc">
        <ul>
          <li class="on">
            <h4>校园项目</h4>
            <div>
              <router-link to="/summary">汇总报表</router-link>
              <router-link to="/setting">设置资料</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--右侧内容-->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {},
  mounted () {
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}
</style>
