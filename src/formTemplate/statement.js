// 声明
const template = `
<div>
    <span>第</span>
    <el-input style="width: auto" v-model="extendData.deputy_applicant" placeholder="请输入代表人序号"></el-input>
    <span>署名申请人为代表人</span>
</div>
`;

const options = {
    data(){
        return {
            extendData:{
                deputy_applicant:"",
            },
        }
    },
};
const vm = {
    custom: true,
    vm: options,
    template: template,
    label: '声明',
    field: 'statement_vm',
}
export {vm}