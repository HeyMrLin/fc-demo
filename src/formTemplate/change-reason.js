// 变更原因
let count = 0;
const uniqueId = () => ++count;
function vm(label) {
    const template = `
        <el-checkbox class="custom-checkbox" v-model="extendData.amendment_notice">
            <span>针对</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="extendData.notification_date" placeholder="请输入通知书日期"></el-date-picker>
            <span>日发出的</span>
            <el-input v-model="extendData.notification_name" placeholder="请输入通知书名称"></el-input>
            <span>（发文序号</span>
            <el-input v-model="extendData.serial_number" placeholder="请输入发文序列号"></el-input>
            <span>）进行补正</span>
        </el-checkbox>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    amendment_notice:false,
                    notice_date:"",
                    notice_name:"",
                    notice_serial:"",
                },
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__cr"+uniqueId(),
    };
}
export {vm}