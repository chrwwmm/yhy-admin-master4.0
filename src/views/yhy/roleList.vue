<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item>当前位置</el-breadcrumb-item>
	                <el-breadcrumb-item>首页</el-breadcrumb-item>
					<el-breadcrumb-item>用户列表</el-breadcrumb-item>
	            </el-breadcrumb>			
	        </div>
			<div class="handle-box">
				<el-button icon="el-icon-plus" class="handle-add mr10" @click="handleAdd"></el-button>
				<el-button icon="el-icon-delete" class="handle-del mr10" @click="handleDel"></el-button>
				<el-input class="inputSearch" placeholder="请输入内容" v-model="inputSearch">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
				</el-input>   
		    </div>
	        <div class="userlist">
		        <div class="userlist-main">
		        	<el-table :data="userList" highlight-current-row border style="width: 100%;" ref="multipleTable">
						<el-table-column prop="id" label="登陆账号" width="120" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="pwd" label="登陆密码" width="200" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="name" label="用户名称" width="150" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="sex" label="性别" width="80" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="phone" label="手机号码" width="200" align="center" sortable></el-table-column>
						<el-table-column prop="mail" label="邮箱" width="240" align="center"></el-table-column>
						<el-table-column prop="describe" label="描述" width="150" align="center"></el-table-column>
						<el-table-column prop="firm" label="厂商" width="150" align="center"></el-table-column>
						<el-table-column prop="role" label="当前角色" min-width="100" align="center"></el-table-column>
			        </el-table>
		        </div>
		        
		        <!--工具条-->
				<el-col class="pagination">
					<el-pagination
						@current-change="handleCurrentChange"
						background
						:page-size="5"
						layout="total, prev, pager, next, jumper"
						:total="12">
					</el-pagination>
				</el-col>
	        </div> 
		</div>

		<!-- 新增弹框 -->
		<el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="500px">
			<el-form :model="form">
				<el-form-item label="登录名" :label-width="formLabelWidth">
					<el-input v-model="form.id" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="form.pwd" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="form.name" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-select v-model="form.sex" placeholder="请选择性别">
						<el-option label="男" value="male"></el-option>
						<el-option label="女" value="female"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号" :label-width="formLabelWidth">
					<el-input v-model="form.phone" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.mail" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="厂商" :label-width="formLabelWidth">
					<el-input v-model="form.firm" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" :label-width="formLabelWidth">
					<el-input v-model="form.describe" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
    	
	</div>
</template>

<script>
	import { delmLanmu,addmLanmu,editmLanmu,getmPage } from '@/api/api';
    export default {
        data() {
            return {
				dialogFormVisible: false,

				inputSearch: '',
				form: {
					id: '',
					pwd: '',
					name: '',
					sex: '',
					phone: '',
					mail: '',
					describe: '',
					firm: '',
					role: ''
				},
				formLabelWidth: '60px',
            	userList:[
					{"id":"标准房123","pwd":"430682196521458745","name":"游客1","sex":"男","phone":"13025845758","mail":"406525384@qq.com","describe":"亿慧云普通用户","firm":"酒店","role":"亿慧云普通用户"},
					{"id":"标准房","pwd":"430682196521458745","name":"游客1","sex":"男","phone":"13025845758","mail":"406525384@qq.com","describe":"亿慧云普通用户","firm":"酒店","role":"亿慧云普通用户"},
					{"id":"标准房","pwd":"430682196521458745","name":"游客1","sex":"男","phone":"13025845758","mail":"406525384@qq.com","describe":"亿慧云普通用户","firm":"酒店","role":"亿慧云普通用户"},
					{"id":"标准房","pwd":"430682196521458745","name":"游客1","sex":"男","phone":"13025845758","mail":"406525384@qq.com","describe":"亿慧云普通用户","firm":"酒店","role":"亿慧云普通用户"}
				]
            }
        },
        created(){},
        methods: {
        	handleCurrentChange(val){
                this.cur_page = val;
                this.getmPage();
            },
        	//显示新增弹框
			handleAdd: function () {
				this.dialogFormVisible = true;
			},
			//删除
			handleDel: function () {
				console.log('删除！');
			},
			handleSearch: function () {
				console.log('搜索一下！');
			}		    
        }
    }
</script>

<style>
.userlist-main{min-height: 260px;}
.crumbs{
	margin-top: 20px;
	margin-bottom: 20px;
	float: left;
}
.handle-box{
	margin-bottom: 20px;
	float: right;
}
.el-button{
	padding: 12px;
}
.inputSearch{
	margin-left: 10px;
	width: initial;
}
.el-pagination.is-background .el-pager li.active {
    background-color: #333744;
}
.el-table thead {
    color: #000;
}
</style>