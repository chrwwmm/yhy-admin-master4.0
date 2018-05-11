<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item>当前位置</el-breadcrumb-item>
	                <el-breadcrumb-item>首页</el-breadcrumb-item>
					<el-breadcrumb-item>用户服务订单</el-breadcrumb-item>
	            </el-breadcrumb>			
	        </div>
			<div class="handle-box">
				<!-- <el-button class="handle-ed mr10" @click="handleEd">已完成</el-button>
				<el-button class="handle-ing mr10" @click="handleIng">未完成</el-button> -->
				<el-button icon="el-icon-plus" class="handle-add mr10" @click="handleAdd"></el-button>
				<el-button icon="el-icon-delete" class="handle-del mr10" @click="delSelect"></el-button>
				<el-select clearable style="width: 120px;" v-model="selectType" placeholder="请选择" @change="selectTypechange">
					<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-input class="inputSearch" placeholder="请输入内容" v-model="inputSearch">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
				</el-input>   
		    </div>
	        <div class="userlist">
		        <div class="userlist-main">
		        	<el-table :data="userList" highlight-current-row border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="orderNumber" label="订单号" width="120" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="orderType" label="订单类型" width="150" align="center" label-class-name="table-column"></el-table-column>
						<!-- <el-table-column prop="applyUser" label="订单申请用户" width="150" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="serveUser" label="订单服务用户" width="150" align="center" label-class-name="table-column"></el-table-column>
						<el-table-column prop="assignUser" label="订单被指派用户" width="150" align="center"></el-table-column>
						<el-table-column prop="hostID" label="主机编号" width="120" align="center"></el-table-column>
						<el-table-column prop="orderTime" label="客户下单时间" width="150" align="center"></el-table-column>
						<el-table-column prop="receiveTime" label="管理员接收订单时间" width="150" align="center"></el-table-column>
						<el-table-column prop="assignTime" label="管理员指派时间" width="150" align="center"></el-table-column>
						<el-table-column prop="queryTime" label="客户确认时间" width="150" align="center"></el-table-column> -->
						<el-table-column prop="orderStatus" label="订单状态" width="150" align="center"></el-table-column>
						<el-table-column prop="orderDescribe" label="订单描述" min-width="100" align="center"></el-table-column>
			        	<el-table-column label="操作" width="255">
			                <template slot-scope="scope">
								<el-button size="small" type="danger"
			                            @click="handleAssign(scope.$index, scope.row)">分配</el-button>
			                    <el-button size="small"
			                            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
								<el-button size="small" type="danger"
			                            @click="handleTest(scope.$index, scope.row)">测试</el-button>
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
			<el-form :model="addForm" label-width="140px">
				<el-form-item label="订单号" prop="orderNumber">
					<el-input v-model="addForm.orderNumber"></el-input>
				</el-form-item>
				<el-form-item label="订单类型" prop="orderType">
					<el-input v-model="addForm.orderType"></el-input>
				</el-form-item>
				<el-form-item label="订单申请用户" prop="applyUser">
					<el-input v-model="addForm.applyUser"></el-input>
				</el-form-item>
				<el-form-item label="订单服务用户" prop="serveUser">
					<el-input v-model="addForm.serveUser"></el-input>
				</el-form-item>
				<el-form-item label="订单被指派用户" prop="assignUser">
					<el-input v-model="addForm.assignUser"></el-input>
				</el-form-item>
				<el-form-item label="主机编号" prop="hostID">
					<el-input v-model="addForm.hostID"></el-input>
				</el-form-item>
				<el-form-item label="客户下单时间" prop="orderTime">
					<el-input v-model="addForm.orderTime"></el-input>
				</el-form-item>
				<el-form-item label="管理员接收订单时间" prop="receiveTime">
					<el-input v-model="addForm.receiveTime"></el-input>
				</el-form-item>
				<el-form-item label="管理员指派时间" prop="assignTime">
					<el-input v-model="addForm.assignTime"></el-input>
				</el-form-item>
				<el-form-item label="客户确认时间" prop="queryTime">
					<el-input v-model="addForm.queryTime"></el-input>
				</el-form-item>
				<el-form-item label="订单状态" prop="orderStatus">
					<el-input v-model="addForm.orderStatus" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="订单描述" prop="orderDescribe">
					<el-input v-model="addForm.orderDescribe"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 分配弹框 -->
		<el-dialog title="分配订单" :visible.sync="assignFormVisible" width="500px">
			<el-form :model="assignForm" label-width="80px">
				<el-form-item label="分配给" prop="assign">
					<el-select v-model="assignForm.value" placeholder="请选择">
						<el-option v-for="item in assignMember" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="assignForm.textarea"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="assignFormVisible = false">取消</el-button>
				<el-button type="primary" @click="assignSubmit">提交</el-button>
			</div>
		</el-dialog>

		<!-- 编辑弹框 -->
		<el-dialog title="编辑订单" :visible.sync="editFormVisible" width="500px">
			<el-form :model="editForm" label-width="140px">
				<el-form-item label="订单号" prop="orderNumber">
					<el-input v-model="editForm.orderNumber" readonly></el-input>
				</el-form-item>
				<el-form-item label="订单类型" prop="orderType">
					<el-input v-model="editForm.orderType" readonly></el-input>
				</el-form-item>
				<el-form-item label="订单申请用户" prop="applyUser">
					<el-input v-model="editForm.applyUser" readonly></el-input>
				</el-form-item>
				<el-form-item label="订单服务用户" prop="serveUser">
					<el-input v-model="editForm.serveUser" readonly></el-input>
				</el-form-item>
				<el-form-item label="订单被指派用户" prop="assignUser">
					<el-input v-model="editForm.assignUser" readonly></el-input>
				</el-form-item>
				<el-form-item label="主机编号" prop="hostID">
					<el-input v-model="editForm.hostID" readonly></el-input>
				</el-form-item>
				<el-form-item label="客户下单时间" prop="orderTime">
					<el-input v-model="editForm.orderTime" readonly></el-input>
				</el-form-item>
				<el-form-item label="管理员接收订单时间" prop="receiveTime">
					<el-input v-model="editForm.receiveTime" readonly></el-input>
				</el-form-item>
				<el-form-item label="管理员指派时间" prop="assignTime">
					<el-input v-model="editForm.assignTime" readonly></el-input>
				</el-form-item>
				<el-form-item label="客户确认时间" prop="queryTime">
					<el-input v-model="editForm.queryTime" readonly></el-input>
				</el-form-item>
				<el-form-item label="订单状态" prop="orderStatus">
					<el-input v-model="editForm.orderStatus" readonly></el-input>
				</el-form-item>
				<el-form-item label="订单描述" prop="orderDescribe">
					<el-input v-model="editForm.orderDescribe" readonly></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit">提交</el-button>
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
				editFormVisible: false,
				assignFormVisible: false,

				multipleSelection: '',
				inputSearch: '',

				optionPopoverVisible: false,

				types: [
					{
						value: '选项1',
						label: '已完成'
					}, {
						value: '选项2',
						label: '未完成'
					}
				],
				selectType: '',
				
				//新增界面数据
				addForm: {
					orderNumber: '',
					orderType: '',
					applyUser: '',
					serveUser: '',
					assignUser: '',
					hostID: '',
					orderTime: '',
					receiveTime: '',
					assignTime: '',
					queryTime: '',
					orderStatus: '',
					orderDescribe: ''
				},
				//编辑界面数据
				editForm: {
					orderNumber: '',
					orderType: '',
					applyUser: '',
					serveUser: '',
					assignUser: '',
					hostID: '',
					orderTime: '',
					receiveTime: '',
					assignTime: '',
					queryTime: '',
					orderStatus: '',
					orderDescribe: ''
				},
				//分配界面数据
				assignForm:{
					value: '',
					textarea: ''
				},
				assignMember: [
					{
						value: '选项1',
						label: '分配员1'
					},
					{
						value: '选项2',
						label: '分配员2'
					}, 
					{
						value: '选项3',
						label: '分配员3'
					}
				],
				assignValue: '',
            	userList:[
					{"orderNumber":"001","orderType":"类型1","applyUser":"申请用户001","serveUser":"服务用户001","assignUser":"被指派用户001","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"完成","orderDescribe":"订单描述"},
					{"orderNumber":"002","orderType":"类型2","applyUser":"申请用户002","serveUser":"服务用户002","assignUser":"被指派用户002","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"},
					{"orderNumber":"003","orderType":"类型3","applyUser":"申请用户003","serveUser":"服务用户003","assignUser":"被指派用户003","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"}
				],
				// userList: [],
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
			// this.getRoom();
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
			// handleEd: function() {
			// 	this.userList = [
			// 		{"orderNumber":"001","orderType":"类型1","applyUser":"申请用户001","serveUser":"服务用户001","assignUser":"被指派用户001","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"完成","orderDescribe":"订单描述"}
			// 	]
			// },
			// handleIng: function() {
			// 	this.userList = [
			// 		{"orderNumber":"002","orderType":"类型2","applyUser":"申请用户002","serveUser":"服务用户002","assignUser":"被指派用户002","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"},
			// 		{"orderNumber":"003","orderType":"类型3","applyUser":"申请用户003","serveUser":"服务用户003","assignUser":"被指派用户003","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"}
			// 	]
			// },
			selectTypechange: function() {
				let val = this.selectType;
				if(val===''){
					this.userList = [
			 			{"orderNumber":"001","orderType":"类型1","applyUser":"申请用户001","serveUser":"服务用户001","assignUser":"被指派用户001","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"完成","orderDescribe":"订单描述"},
						{"orderNumber":"002","orderType":"类型2","applyUser":"申请用户002","serveUser":"服务用户002","assignUser":"被指派用户002","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"},
						{"orderNumber":"003","orderType":"类型3","applyUser":"申请用户003","serveUser":"服务用户003","assignUser":"被指派用户003","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"}
					]
				}else if(val==='选项1'){
					this.userList = [
			 			{"orderNumber":"001","orderType":"类型1","applyUser":"申请用户001","serveUser":"服务用户001","assignUser":"被指派用户001","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"完成","orderDescribe":"订单描述"}
					]
				}else if(val==='选项2'){
					this.userList = [
						{"orderNumber":"002","orderType":"类型2","applyUser":"申请用户002","serveUser":"服务用户002","assignUser":"被指派用户002","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"},
						{"orderNumber":"003","orderType":"类型3","applyUser":"申请用户003","serveUser":"服务用户003","assignUser":"被指派用户003","hostID":"10000","orderTime":"18/03/28","receiveTime":"18/03/28","assignTime":"18/03/28","queryTime":"18/03/28","orderStatus":"未完成","orderDescribe":"订单描述"}
					]
				}
			},
        	//显示新增弹框
			handleAdd: function () {
				this.dialogFormVisible = true;
			},
			//编辑
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//分配
			handleAssign: function (index, row) {
				this.assignFormVisible = true;
			},
			//测试
			handleTest: function (index, row) {
				console.log('测试!');
				let para = { phone: 15627284018 }
				test(para).then((res) => {
					this.$message({
						message: '测试成功',
						type: 'success'
					});	
				});
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

			//编辑提交
			editSubmit: function () {
				console.log("编辑提交");
			},

			//分配提交
			assignSubmit: function () {
				console.log("分配提交");
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
				if(this.multipleSelection===''){
					this.$message({
						message: '请选择要删除的行！'
					});
				}else{
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
.handle-box .handle-ing{
	margin-right: 360px;
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
.el-button--danger {
    color: #fff;
    background-color: #333744;
    border-color: #333744;
}
.el-button--danger:focus,.el-button--danger:hover {
    background-color: #333744;
    border-color: #333744;
    opacity: 0.8;
}
</style>