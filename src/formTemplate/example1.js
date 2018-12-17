/*
* 自定义组件中可以使用其它子组件
* */
import OffsetContent from './formComponents/OffsetContent'
/*
* template为组件模板
* 和.vue文件中的template一样
* 暂时还没想到优化的方法
* */
const template = `
<div style="text-align: right">
<el-table border :data="extendData.tableData">
    <el-table-column
        prop="file_name"
        label="文件名称"
        min-width="180">
    </el-table-column>
    <el-table-column
        prop="file_place"
        label="文件当中的位置"
        width="180">
    </el-table-column>
    <el-table-column
        prop="before_offset"
        label="补正前"
        width="180">
    </el-table-column>
    <el-table-column
        prop="after_offset"
        label="补正后"
        width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click.native.prevent="handleDelete(scope.$index,extendData.tableData)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table>
<el-button style="margin-top: 10px" type="primary" @click="add">新增</el-button>
<el-dialog :visible.sync="isVisible" custom-class="offset_dialog" :append-to-body="true" :modal="false" title="新增/编辑补正内容">
    <offset-content ref="addOffset" @save="save" :rowData="rowData" @controlDialog="controlDialog"></offset-content>
</el-dialog>

</div>
`;

/*
* options为生成vue实例的选项
* */
const options = {
    data(){
        return {
            isVisible:false,
            /*
            * 必须！所有需要返回给后端的字段都要放在extendData对象中
            * */
            extendData:{
                tableData:[],
            },
            rowData:{},
            type:"add",
            index:null,
        }
    },
    methods:{
        handleDelete(index,rows){
            rows.splice(index, 1);
        },
        handleEdit(row,index){
            this.type = "edit";
            this.index = index;
            this.rowData = row;
            this.controlDialog("block");
        },
        add(){
            this.index = null;
            this.type = "add";
            this.$refs.addOffset?this.$refs.addOffset.clear():"";
            this.controlDialog("block");
        },
        save(val){
            if(this.type === "edit"){
                for (let key in val){
                    if(val.hasOwnProperty(key)){
                        this.extendData.tableData[this.index][key] = val[key];
                    }
                }
            }else {
                this.extendData.tableData.push(val);
            }
            this.controlDialog('none');
        },
        controlDialog(c){
            this.isVisible = c === "block"?true:false;
            const parent = document.getElementsByClassName("offset_dialog")[0].parentNode;
            parent.style.display = c;
        },
    },
    components:{
        OffsetContent
    },
};
/*
* vm为主要输出内容
* */
const vm = {
    custom:true,    // 必填，说明为自定义组件
    vm:options,     // 必填
    template:template,  // 必填
    label:"补正内容",   // 选填，为form-item的label
    field:"offset_content_vm",  // 必填，此处虽为必填，但是字段是没有用的，只是源码会报错，后续会更改源码
};
export {vm}