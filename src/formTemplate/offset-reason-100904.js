import {handleSingle} from '../formConfig/handle/handle'
const template = `
<el-checkbox-group class="custom-checkbox" v-model="group" @change="changeGroup">
    <el-checkbox v-model="extendData.amendment_reason_article60" label="amendment_reason_article60">
        <span>根据专利法实施细则第60条第3款的规定</span>
    </el-checkbox>
    <el-checkbox v-model="extendData.tab100904amendment_reason_article66" label="tab100904amendment_reason_article66">
        <span>根据专利法实施细则第66条第4款的规定</span>
    </el-checkbox>
    <el-checkbox v-model="extendData.amendment_reason_notice" label="amendment_reason_notice">
        <span>针对</span>
        <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
        <span>日发出的</span>
        <el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
        <span>（发文序号</span>
        <el-input v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
        <span>）进行补正</span>
    </el-checkbox>
</el-checkbox-group>
`;

const options = {
    data(){
        return {
            extendData:{
                amendment_reason_article60:false,
                tab100904amendment_reason_article66:false,
                amendment_reason_notice:false,
                notice_serial:"",
                notice_name:"",
                notice_date:"",
            },
            group:[],
            checkboxKey:["amendment_reason_article60","tab100904amendment_reason_article66","amendment_reason_notice"],
        }
    },
    methods:{
        changeGroup:handleSingle,
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

const vm = {
    custom:true,
    vm:options,
    template:template,
    label:"补正原因",
    field:"offset_reason_vm",
}

export {vm}