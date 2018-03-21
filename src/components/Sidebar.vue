<template>
    <div class="sidebar">
        <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            background-color="#2E363F"
            text-color="#fff"
            active-text-color="#fff"
            unique-opened
            router>
            <template v-for="item in newrouter">
                <template v-if="item.childMenu">
                    <el-submenu :index="item.bigMenu.url">
                        <template slot="title"><i :class="item.bigMenu.icon"></i>{{ item.bigMenu.name }}</template>
                        <el-menu-item v-for="(subItem,i) in item.childMenu" :key="i" :index="subItem.url">{{ subItem.name }}
                        </el-menu-item>
                     </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.bigMenu.url">
                        <i :class="item.bigMenu.icon"></i>{{ item.bigMenu.name }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                items: [
                	{
                        icon: 'el-icon-menu',
                        index: 'user',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'user1',
                                title: '用户管理1'
                            },
                            {
                                index: 'user2',
                                title: '用户管理2'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'userList',
                        title: '用户列表'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'roleList',
                        title: '角色列表'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'processLog',
                        title: '后台进程日志'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'equipmentControl',
                        title: '设备管理',
                        subs: [
                            {
                                index: 'equipmentControl1',
                                title: '设备管理1'
                            },
                            {
                                index: 'equipmentControl2',
                                title: '设备管理2'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'equipmentList',
                        title: '设备列表',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'equipmentOrigin',
                        title: '设备溯源'
                    }
                ]
            }
        },
        created() {
            this.testSidebar();
        },
        computed:{
            ...mapGetters([
                'newrouter'
            ]),
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            testSidebar:function () {
                console.log(this.newrouter)
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 222px;
        left: 0;
        top: 60px;
        bottom:0;
        background: #2E363F;
    }
    .el-menu-item.is-active{
        background-color: #00C1DE !important;
    }
    .el-menu { 
        border-right: none;
    }
</style>
