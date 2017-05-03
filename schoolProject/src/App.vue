<template>
  <div>
    <!--顶部-->
    <div class="xyhead"><img src="./assets/images/logo1-default.png"/></div>
    <!--左侧导航-->
    <div class="xynav">
      <div class="xynavc">
        <ul>
          <li :class="{'on': flag}">
            <h4 @click="showLeftMenu">校园项目</h4>
            <div v-if="flag">
              <router-link to="/summary">汇总报表</router-link>
              <router-link to="/personal">学生健康明细</router-link>
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
  data () {
    return {
        flag:true
    }
  },
  mounted () {
  },
  methods: {
      //显隐左侧菜单栏
      showLeftMenu () {
        this.flag = !this.flag
      }
  }
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
