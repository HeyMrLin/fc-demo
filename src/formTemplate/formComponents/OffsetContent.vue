<template>
        <el-form ref="form" :model="offset_content">
            <el-form-item label="文件名称" prop="filename">
                <el-select v-model="offset_content.filename">
                    <el-option
                            v-for="item in file_names"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件当中的位置" prop="position">
                <el-input v-model="offset_content.position"></el-input>
            </el-form-item>
            <el-form-item label="补正前" prop="beforeAmendment">
                <el-input v-model="offset_content.beforeAmendment"></el-input>
            </el-form-item>
            <el-form-item label="补正后" prop="afterAmendment">
                <el-input v-model="offset_content.afterAmendment"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add">保存</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
</template>

<script>
    export default {
        name: 'OffsetContent',
        data(){
            return {
                offset_content:{
                    filename:"",
                    position:"",
                    beforeAmendment:"",
                    afterAmendment:"",
                },
                file_names:[
                    {value: '权利要求书', label: '权利要求书'},
                    {value: '说明书', label: '说明书'},
                    {value: '说明书摘要', label: '说明书摘要'},
                    {value: '摘要附图', label: '摘要附图'},
                    {value: '专利代理委托书', label: '专利代理委托书'},
                    {value: '国际申请进入中国国家阶段声明（PCT）', label: '国际申请进入中国国家阶段声明（PCT）'},
                ],
            }
        },
        props:{
            rowData:{
                type:Object,
                default(){
                    return {}
                },
            },
        },
        watch:{
            rowData:function (val) {
                this.offset_content = this.copyObj(val);
            }
        },
        mounted(){
            this.offset_content = this.copyObj(this.rowData);
        },
        methods:{
            copyObj(obj){
                return Object.assign({},obj);
            },
            add(){
                this.$emit("save",this.copyObj(this.offset_content));
            },
            cancel(){
                this.$emit("controlDialog","none");
            },
            clear(){
                this.$refs.form.resetFields();
            },
        },
    }
</script>

<style scoped>

</style>