import {handleSingle} from "../formConfig/handle/handle";

let count = 0;
const uniqueId = () => ++count;
let defaultCol = {
    labelWidth:"0px",
};
function vm(field, formItemLabel = "", func = "", col = {},hasCustomClass = true) {
    let checkbox = "";
    let extendData = {};
    for (let key in field) {
        if (field.hasOwnProperty(key)) {
            checkbox += `<el-checkbox v-model="extendData.${key}" label="${key}">${field[key]}</el-checkbox>`;
            extendData[key] = false;
        }
    }
    let template = `<el-checkbox-group :class="{'custom-checkbox':hasCustomClass}" v-model="group" @change="changeGroup">${checkbox}</el-checkbox-group>`;

    const options = {
        data() {
            return {
                extendData,
                group: [],
                hasCustomClass,
            }
        },
        methods: {
            changeGroup: !func ? handleSingle : func,
        },
        watch: {
            group: function (val) {
                if (func)return
                for (let key in this.extendData) {
                    if (this.extendData.hasOwnProperty(key)) {
                        this.extendData[key] = key !== val[0] ? false : true;
                    }
                }
            }
        }
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: formItemLabel,
        field: "__checkbox" + uniqueId(),
        col:Object.keys(col).length !== 0 ? col : defaultCol,
    }
}

export {vm}
