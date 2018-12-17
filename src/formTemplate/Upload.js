// 著录项目变更申报书 附件
const defaultProps = {
    handlePreview:()=>{},
    handleRemove:()=>{},
    beforeRemove:()=>{},
    handleExceed:()=>{},
};
function vm({label,url,props = {},tip="",type = "picture"}) {
    const template = `
<div>
    <template v-if="type === 'file'">
        <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">${tip}</div>
        </el-upload>
    </template>
    <template v-if="type === 'picture'">
        <el-upload
            :action=action
            :file-list="fileList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </template>
</div>
        
    `;
    const options = {
        data() {
            return {
                extendData: {

                },
                fileList:[{url:'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'}],
                action:url,
                dialogImageUrl:"",
                dialogVisible:false,
                type:type
            }
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handlePreview:props.handlePreview?props.handlePreview:defaultProps.handlePreview,
            handleRemove:props.handleRemove?props.handleRemove:defaultProps.handleRemove,
            beforeRemove:props.beforeRemove?props.beforeRemove:defaultProps.beforeRemove,
            handleExceed:props.handleExceed?props.handleExceed:defaultProps.handleExceed,
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__upload",
    };
}
export {vm}