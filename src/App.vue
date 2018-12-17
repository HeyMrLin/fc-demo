<template>
    <div id="app">

        <el-menu :default-active="activeIndex"
                 class="el-menu-custom"
                 mode="vertical"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
            <el-menu-item :key="index"
                          :index="index+''"
                          v-if="!item.submenu"
                          v-for="item,index in menu">
                <router-link :to="item.router">{{item.menu}}</router-link>
            </el-menu-item>
            <el-submenu :key="index"
                        :index="index+''"
                        v-if="item.submenu"
                        v-for="item,index in menu">
                <template slot="title">{{item.menu}}</template>
                <el-menu-item :key="index"
                              :index="index+''"
                              v-for="menu,index in item.submenu">
                    <router-link :to="menu.router">{{menu.menu}}</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import menuConfig from '@/config/menuConfig'

    export default {
        name: 'App',
        data () {
            return {
                activeIndex: '1',
                menu: menuConfig,
            }
        },
        methods: {
            handleSelect () {
            },
        },
        mounted () {
            // console.log(this.$formCreate)
        },
    }
</script>

<style>
    html,
    body {
        height: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        /*margin-top: 20px;*/
        height: 100%;
    }

    .el-menu-custom {
        width: 11%;
        float: left;
        height: 100%;
    }

    #app .main {
        width: 89%;
        float: right;
    }

    .el-menu-item a {
        color: #fff;
        text-decoration: none;
        display: block;
    }

    .el-menu-item .router-link-exact-active {
        color: #ffd04b;
    }

    .el-menu-item .is-active {
        background-color: #545c64;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }

</style>
