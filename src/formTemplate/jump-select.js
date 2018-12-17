/*
* 暂时不需要
* 没办法动态配置url，
* 只能在配置表中写死
* */
import JumpSelect from '@/components/form/JumpSelect'
let count = 0;
const uniqueId = () => ++count;
function vm(type,field,label) {
    const template = `
        <jump-select :type="type" v-model="extendData.contacts"></jump-select>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    [field]: "",
                },
                type: type,
            }
        },
        components: {
            JumpSelect,
        }
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__tmp"+uniqueId(),
    };
}
export {vm}