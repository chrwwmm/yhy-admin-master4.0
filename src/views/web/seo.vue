<template>
	<div class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> web</el-breadcrumb-item>
                <el-breadcrumb-item>SEO</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :model="form" label-width="80px" style="margin:30px;width:60%;min-width:300px;">
	            <el-form-item label="关键词" prop="keywords">
					<el-input v-model="form.keywords" readonly></el-input>
				</el-form-item>
                <el-form-item label="generator" prop="generator">
					<el-input v-model="form.generator" readonly></el-input>
				</el-form-item>
                <el-form-item label="作者" prop="author">
					<el-input v-model="form.author" readonly></el-input>
				</el-form-item>
                <el-form-item label="标题" prop="title">
					<el-input v-model="form.title" readonly></el-input>
				</el-form-item>	
				<el-form-item label="描述" prop="description">
					<el-input type="textarea" :rows="5" v-model="form.description" readonly></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="aboutEdit" @click="editFormVisible = true">编辑</el-button>
				</el-form-item>            
			</el-form>

            <!--编辑界面-->
            <el-dialog title="编辑seo" :visible.sync="editFormVisible">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="关键词" prop="keywords">
                        <el-input v-model="form.keywords"></el-input>
                    </el-form-item>
                    <el-form-item label="generator" prop="generator">
                        <el-input v-model="form.generator"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input type="textarea" :rows="5" v-model="form.description"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="updateSeo">提交</el-button>
                </div>
            </el-dialog>
        </div>	        
	</div>
</template>
<script>
import { selectAllSeo,updateSeo } from '@/api/api';
export default {
    data() {
        return {
            editFormVisible: false,//编辑界面是否显示
            form: {
                keywords: '',
                description: '',
                generator: '',
                author: '',
                title: '',
                seoid: ''
            }
        }
    },
    created(){
        this.selectAllSeo();
    },
    methods: {
        selectAllSeo(){
            selectAllSeo().then((res) => {
                console.log(res);
                this.form = res.data[0];
            });
        },
        updateSeo(){
            let keywords = this.form.keywords;
            let description = this.form.description;
            let generator = this.form.generator;
            let author = this.form.author;
            let title = this.form.title;
            let seoid = this.form.seoid;
             if (keywords===''||description===''||generator===''||author===''||title===''||seoid==='') {
                this.$message({
                    message: '栏目不能为空！'
                });
            }else{
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    let para = { keywords:keywords, description:description, generator:generator, author:author, title:title, seoid:seoid };
                    console.log(para)
                    updateSeo(para).then((res) => {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.selectAllSeo();
                    });
                }).catch(() => {
                    console.log("失败！");
                });
                this.editFormVisible = false;					
            }
        }
    }
}
</script>
<style scoped>

</style>