<template>
    <el-popover trigger="click" placement="top"  v-model="popoverVisible">
        <el-input v-model="dataVal"></el-input>
        <div style="text-align: right; margin-top: 10px;">
            <el-button type="text" size="mini" @click="cancel">取消</el-button>
            <el-button type="primary" size="mini" @click="confirm">确定</el-button>
        </div>
        <div slot="reference" style="color: #409EFF; cursor: pointer; ">{{dataValue}}</div>
    </el-popover>
</template>
<script>
    import { updateUser } from '@/api/api';
    export default {
        data() {
            return {
                popoverVisible: false,
                dataVal: ''
            }
        },
        props:[
            'dataValue',
            'dataRid',
            'dataColumn'
        ],
        created(){
			this.getDataVal();
		},
        mounted(){},
        methods: {
            getDataVal: function () {
                this.dataVal = this.dataValue;
            },
            cancel: function () {
                this.popoverVisible = false;
            },
            confirm: function () {
                let editValue = this.dataVal;
                let editRid = this.dataRid;
                let editColumn = this.dataColumn.property;
                let self = this;
                if (editValue==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        // let para = { value: editValue, rid: editRid, column: editColumn };
                        let para = { [editColumn]: editValue, id: editRid };
						console.log(para)
						updateUser(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							self.$emit('refreshList');
						});
					}).catch(() => {
						console.log("编辑失败！");
					});
                    this.popoverVisible = false;
                }
            }
        }
    }
</script>
<style scoped></style>
