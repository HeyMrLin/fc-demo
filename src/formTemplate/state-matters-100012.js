// 陈述事项
import {handleSingle} from '../formConfig/handle/handle'

function vm(label) {
    const template = `
        <el-checkbox-group @change="changeGroup" class="custom-checkbox" v-model="group">
            <el-checkbox v-model="extendData.notice" label="notice">针对国家知识产权局于<el-date-picker value-format="yyyy-MM-dd" placeholder="请输入通知书日期" v-model="extendData.notice_date"></el-date-picker>发出的<el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>（发文序号<el-input placeholder="请输入发文序列号" v-model="extendData.notice_serial"></el-input>）陈述意见</el-checkbox>
            <el-checkbox v-model="extendData.notice_supplemental" label="notice_supplemental">针对国家知识产权局于<el-date-picker value-format="yyyy-MM-dd" placeholder="请输入通知书日期" v-model="extendData.notice_date_supplemental"></el-date-picker>发出的<el-input v-model="extendData.notice_name_supplemental" placeholder="请输入通知书名称"></el-input>（发文序号<el-input placeholder="请输入发文序列号" v-model="extendData.notice_serial_supplemental"></el-input>）陈述意见</el-checkbox>
            <el-checkbox v-model="extendData.active_amendment" label="active_amendment">主动提出修改（根据专利法实话细则第51条第1、2款的规定）</el-checkbox>
            <el-checkbox v-model="extendData.reply_to_other" label="reply_to_other">其他事宜</el-checkbox>
        </el-checkbox-group>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    notice:false,
                    notice_supplemental:false,
                    active_amendment:false,
                    reply_to_other:false,
                    notice_date:"",
                    notice_date_supplemental:"",
                    notice_name:"",
                    notice_name_supplemental:"",
                    notice_serial:"",
                    notice_serial_supplemental:"",

                },
                group:[],
                checkboxKey:["notice","notice_supplemental","active_amendment","reply_to_other"],
            }
        },
        methods:{
            changeGroup:handleSingle
        },
        watch: {
            group: function (val) {
                for (let key in this.extendData) {
                    if (this.extendData.hasOwnProperty(key)) {
                        if(this.checkboxKey.indexOf(key) !== -1){
                            this.extendData[key] = key !== val[0] ? false : true;
                        }
                    }
                }
            }
        }
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__sm",
    };
}
export {vm}