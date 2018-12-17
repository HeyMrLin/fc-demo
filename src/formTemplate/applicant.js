// 请求人
function vm(label) {
    const template = `
        <div>
            <el-checkbox v-model="extendData.applicant_type_patentee">专利权人</el-checkbox>
            <el-checkbox v-model="extendData.applicant_type_interested_party">利害关系人<el-input placeholder="请输入请求人名称" v-model="extendData.applicant"></el-input></el-checkbox>
            <div>如果是利害关系人，且专利实施许可合同已经在国家知识产权局备案，请注明备案号：<el-input placeholder="请输入备案号" v-model="extendData.contract_number"></el-input></div>
        </div>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    applicant_type_patentee: false,
                    applicant_type_interested_party: false,
                    applicant:"",
                    contract_number:""
                },
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__applicant",
    };
}
export {vm}