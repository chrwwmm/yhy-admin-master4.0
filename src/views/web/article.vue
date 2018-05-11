<template>
    <div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i>web</el-breadcrumb-item>
	                <el-breadcrumb-item>article</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="article">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="handleAdd">添加article</el-button>
		            <!-- <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                    <el-button type="primary" icon="edit" class="handle-test mr10" @click="doTestBtn">test</el-button>         
		        </div>
		        <div class="article-main">
		        	<el-table :data="article" highlight-current-row border style="width: 100%" ref="multipleTable">
			            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column prop="title" label="标题" width="220"></el-table-column>
						<el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" width="150"></el-table-column>
						<el-table-column prop="summary" label="简介" min-width="200"></el-table-column>
						<!--  获取每一行的index：scope.$index/获取每一行的数据：scope.$row  -->
			            <el-table-column label="操作" width="180">
			                <template slot-scope="scope">
			                    <el-button size="small"
			                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			                    <el-button size="small" type="danger"
			                            @click="handleDel(scope.$index, scope.row)">删除</el-button>
			                </template>
			            </el-table-column>
			        </el-table>
		        </div>
		        
		        <!--工具条-->
				<el-col class="pagination">
		            <el-pagination
		                    @current-change ="handleCurrentChange"
		                    layout="prev, pager, next"
		                    :total="50">
		            </el-pagination>
				</el-col>
	        </div> 
		</div>
    	   	
    	<!--编辑界面-->
		<el-dialog title="编辑article" :visible.sync="editFormVisible">
			<el-form :model="editForm" label-width="80px">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="editForm.title"></el-input>
				</el-form-item>
				<el-form-item label="文章简介" prop="intro">
					<el-input v-model="editForm.summary"></el-input>
				</el-form-item>
                <el-form-item label="文章主图">
					<el-upload
					  	action="/api/admin/addPicture"
					  	list-type="picture-card"
                        limit="1"
					  	:on-remove="handleRemove"
					  	:on-success="uploadimgeditSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img class="yulan" v-if="editForm.picture" width="150px" :src="'http://www.yihuicloud.com' + editForm.picture">
				</el-form-item>
				<el-form-item label="文章内容" prop="content">
                    <quill-editor ref="myTextEditor" v-model="editForm.content" :config="editorOption"></quill-editor>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	    <!--新增界面-->
		<el-dialog title="添加article" :visible.sync="addFormVisible">
			<el-form :model="addForm" label-width="80px">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
				<el-form-item label="文章简介" prop="summary">
					<el-input v-model="addForm.summary"></el-input>
				</el-form-item>
                <el-form-item label="文章主图">
					<el-upload
					  	action="/api/admin/addPicture"
					  	list-type="picture-card"
                        limit="1"
					  	:on-remove="handleRemove"
					  	:on-success="uploadimgaddSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img class="yulan" v-if="addForm.picture" width="150px" :src="'http://www.yihuicloud.com' + addForm.picture">
				</el-form-item>
				<el-form-item label="文章内容" prop="content">
					<quill-editor ref="myTextEditor" v-model="addForm.content" :config="editorOption"></quill-editor>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addSubmit">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { allArticle,addArticle,updateArticle,delArticle,doTest } from '@/api/api';
import { quillEditor } from 'vue-quill-editor';
import moment from 'moment'

export default {
    data() {
        return {
            addFormVisible: false,//新增界面是否显示
            editFormVisible: false,//编辑界面是否显示
            
            // upload
            dialogVisible: false,
            
            article:[],
            theme:[],
            
            editorOption: {
                // something config
            },
            
            multipleSelection: [],
            cur_page: 1,
            
            //编辑界面数据
            editForm: {
                title: '',
                creatTime: '',
                summary:'',
                picture: '',
                content:''
            },
            
            //新增界面数据
            addForm: {
                title: '',
                creatTime: '',
                summary:'',
                picture: '',
                content:'<p>Hello BBK 2017/12/5</p>'
            }
        }
    },
    components: {
        quillEditor
    },
    created(){
        this.getArticle();
    },
    methods: {
        //时间格式化  
        dateFormat: function(row, column) {  
            var date = row[column.property];  
            if (date == undefined) {  
                return "";  
            }
            // return moment(date).format("YYYY-MM-DD HH:mm:ss");
            return moment(date).format("YYYY-MM-DD");  
        },
        doTestBtn: function () {
            let para = { phone:"15627284018" };
            doTest(para).then((res) => {
                this.$message({
                    message: '执行test成功',
                    type: 'success'
                });
            });
        },
        handleCurrentChange(val){
            this.cur_page = val;
            this.getaArticle();
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
        },

        // 文章主图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        uploadimgeditSuccess(res,file, fileList){
            console.log(res);
            console.log(file.name);
            this.editForm.picture = res
        },
        uploadimgaddSuccess(res,file, fileList){
            console.log(res);
            console.log(file.name);
            this.addForm.picture = res
        },

        //编辑
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
            console.log(this.editForm)
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let rid= row.articleId;
                console.log(rid);
                let para = { articleId: rid };
                delArticle(para).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getArticle();
                });
            }).catch(() => {});
        },
        //编辑提交
        editSubmit: function () {
            let editId = this.editForm.articleId;
            let editCreateTime = this.editForm.createTime;
            let editTitle = this.editForm.title;
            let editSummary = this.editForm.summary;
            let editPicture = this.editForm.picture;
            let editContent = this.editForm.content;
            if (editTitle===''||editSummary===''||editPicture===''||editContent==='') {
                this.$message({
                    message: '栏目不能为空！'
                });
            }else{
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    let para = { articleId: editId, createTime: editCreateTime, title: editTitle,summary:editSummary,picture:editPicture,content:editContent };
                    console.log(para)
                    updateArticle(para).then((res) => {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.getArticle();
                    });
                }).catch(() => {
                    console.log("失败！");
                });
                this.editFormVisible = false;					
            }
        },
        //新增
        addSubmit: function () {
            let addTitle = this.addForm.title;
            let addSummary = this.addForm.summary;
            let addPicture = this.addForm.picture;
            let addContent = this.addForm.content;
            console.log(addTitle,addSummary,addPicture,addContent)
            if (addTitle===''||addSummary===''||addPicture===''||addContent==='') {
                this.$message({
                    message: '栏目不能为空！'
                });
            }else{
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    let para = { title: addTitle, summary: addSummary, picture: addPicture, content: addContent }; //这里为什么写成 let para = { name: this.addName }; 时， addLanmu.php报错:name为undefined
                    addArticle(para).then((res) => {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });	
                        this.getArticle();
                    });
                }).catch(() => {
                    console.log("失败！");
                });
                this.addFormVisible = false;					
            }
        },
        getArticle(){
            allArticle().then((res) => {
                this.article = res.data;
            });
        },
        //批量删除
        delAll(){},
        
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
                
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    }
}
</script>
<style scoped>
.article-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
.yulan{position: absolute; top: 0; left: 188px; max-height: 148px;}
</style>
