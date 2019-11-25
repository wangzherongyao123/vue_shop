<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapase ? '64px':'200px'">
          <div class="togglebutton" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse="isCollapase" :collapse-transition="false">
          <!--一级菜单  -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-circle-plus-outline" ></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
           
              <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
        
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return {
   menuList: [],
   isCollapase:false

        }
    },
  created() {

    this.getMenuList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
    if(res.meta.status!==200)return this.$message.error(res.meta.msg);
    this.menuList=res.data;

    },

    toggleCollapse(){
this.isCollapase=!this.isCollapase
    }
  }
};
</script>
<style lang="less" scope>
.home_container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
      border-right:none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.el-icon-circle-plus-outline{
    margin-right: 10px
}
.togglebutton{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    text-align: center;
    cursor: pointer;
}
</style>