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
				<el-button icon="el-icon-delete" class="handle-del mr10" @click="delSelect"></el-button>
				<el-input class="inputSearch" placeholder="请输入内容" v-model="inputSearch">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
				</el-input>   
		    </div>
	        <div class="userlist">
		        <div class="userlist-main">
		        	<el-table :data="userList" highlight-current-row border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="loginName" label="登录账号" width="120" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="password" label="登录密码" width="200" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="name" label="用户名称" width="150" align="center" label-class-name="table-column">
							<template slot-scope="scope">
								<!-- <v-popover :dataValue='scope.row.name' :dataRid='scope.row.id' :dataColumn='scope.column' @refreshList="getRoom"></v-popover> -->
								<v-popover :dataValue='scope.row.name' :dataRid='scope.row.id' :dataColumn='scope.column'></v-popover>
							</template>
						</el-table-column>
						<el-table-column prop="gender" label="性别" width="80" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="phoneNumber" label="手机号码" width="200" align="center">
							<template slot-scope="scope">
								<v-popover :dataValue='scope.row.phoneNumber' :dataRid='scope.row.id' :dataColumn='scope.column'></v-popover>
							</template>
						</el-table-column>
						<el-table-column prop="email" label="邮箱" width="240" align="center">
							<template slot-scope="scope">
								<v-popover :dataValue='scope.row.email' :dataRid='scope.row.id' :dataColumn='scope.column'></v-popover>
							</template>
						</el-table-column>
						<el-table-column prop="description" label="描述" width="150" align="center">
							<template slot-scope="scope">
								<v-popover :dataValue='scope.row.description' :dataRid='scope.row.id' :dataColumn='scope.column'></v-popover>
							</template>
						</el-table-column>
						<el-table-column prop="factoryname" label="厂商" width="150" align="center"></el-table-column>
						<el-table-column prop="roleName" label="当前角色" min-width="100" align="center">
							<template slot-scope="scope">
								<span>{{ scope.row.roleName }}</span>
								<el-popover trigger="click" placement="top" width="120" v-model="scope.row.optionPopoverVisible">
									<el-select v-model="roleValue" placeholder="请选择">
										<el-option
											v-for="item in roleOption"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
									<div style="text-align: right; margin-top: 10px;">
										<el-button type="text" size="mini" @click="scope.row.optionPopoverVisible = false">取消</el-button>
										<el-button type="primary" size="mini" @click="optionConfirm(scope.$index, scope.row)">确定</el-button>
									</div>
									<span slot="reference" class="select" style="padding-left:20px; color:red;">更改</span>
								</el-popover>
							</template>
						</el-table-column>
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
			<el-form :model="addForm">
				<el-form-item label="登录名" :label-width="formLabelWidth">
					<el-input v-model="addForm.loginName" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="addForm.password" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="addForm.name" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-select v-model="addForm.gender" placeholder="请选择性别">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号" :label-width="formLabelWidth">
					<el-input v-model="addForm.phoneNumber" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="addForm.email" style="width:388px" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="厂商" :label-width="formLabelWidth">
					<el-select v-model="addForm.factoryid" placeholder="请选择厂商">
						<el-option label="酒店" value="1"></el-option>
						<el-option label="加盟商" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述" :label-width="formLabelWidth">
					<el-select v-model="addForm.description" placeholder="请选择描述">
						<el-option label="普通用户" value="普通用户"></el-option>
						<el-option label="会员" value="会员"></el-option>
						<el-option label="超级会员" value="超级会员"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getUser,addUser,delUser } from '@/api/api';
	import vPopover from '@/components/Popover.vue';
    export default {
		components:{
            vPopover
        },
        data() {
            return {
				dialogFormVisible: false,

				multipleSelection: '',
				inputSearch: '',

				optionPopoverVisible: false,
				
				//新增界面数据
				addForm: {
					loginName: '',
					password: '',
					name: '',
					gender: '',
					phoneNumber: '',
					email: '',
					description: '',
					factoryid: '',
					roleName: ''
				},
				formLabelWidth: '60px',
            	// userList:[
				// 	{"loginName":"标准房1","password":"430682196521458741","name":"游客1","gender":"男","phoneNumber":"13025845751","email":"406525381@qq.com","description":"亿慧云普通用户1","factoryname":"酒店1","roleName":"亿慧云普通用户1"},
				// ],
				userList: [],
				cur_page: '',
				roleOption: [{
					value: '选项1',
					label: '普通用户'
				}, {
					value: '选项2',
					label: '会员'
				}, {
					value: '选项3',
					label: '超级会员'
				}],
				roleValue: ''
            }
        },
        created(){
			this.getRoom();
		},
        methods: {
			getRoom(){
				getUser().then((res) => {
					this.userList = res.data;
				});
			},
        	handleCurrentChange(val){
                this.cur_page = val;
                console.log(this.cur_page);
            },
        	//显示新增弹框
			handleAdd: function () {
				this.dialogFormVisible = true;
			},
			handleSearch: function () {
				console.log('搜索一下！');
			},
			optionConfirm: function (index, row) {
				console.log(row);
				// this.$set(row, 'optionPopoverVisible', false);
			},

			//新增提交
			addSubmit: function () {
				let addLoginName = this.addForm.loginName;
				let addPassword = this.addForm.password;
				let addName = this.addForm.name;
				let addGender = this.addForm.gender;
				let addPhoneNumber = this.addForm.phoneNumber;
				let addEmail = this.addForm.email;
				let addDescription = this.addForm.description;
				let addFactoryid = this.addForm.factoryid;
				let addRoleName = this.addForm.roleName;
				if (addLoginName===''||addPassword===''||addName===''||addGender===''||addPhoneNumber===''||addEmail===''||addDescription===''||addFactoryid==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { loginName: addLoginName, password: addPassword, name: addName, gender: addGender, phoneNumber: addPhoneNumber, email: addEmail, description: addDescription, factoryid: addFactoryid};
						// console.log(para.name)
						addUser(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							// this.getRoom();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.dialogFormVisible = false;					
				}
			},

			// 获取选中行
			handleSelectionChange(val){
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			// 删除选中行
			delSelect(){
				let that = this;
				let requestList = [];
				this.multipleSelection.forEach(selectedItem => {
					let rid = selectedItem.id;
					// console.log(rid);
					let para = { userid: rid };
					console.log(para);
					let curRequest = delUser(para).then((res) => {});
					requestList.push( curRequest )
				})
				Promise.all(requestList)
				.then((responseList)=>{
					console.log('全部请求都已响应处理完成');
					// that.getRoom();
				})
			}
		}
    }
</script>

<style>
.userlist-main{min-height: 260px;}
.crumbs{
	margin-top: 10px;
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
.el-table--border {
    box-shadow:  0 1px 2px #ccc;
}
.select:hover {
	cursor: pointer;
}
</style>