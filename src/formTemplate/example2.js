/*
* 自定义组件中可以使用其它子组件
* */
import JumpSelect from '@/components/form/JumpSelect'

let count = 0;
const uniqueId = () => ++count;

/*
* 将vm定义为方法
* 参数自定义
* 所以模板的灵活性会提高
* */
function vm(type,field,label) {
    const template = `
        <jump-select :type="type" v-model="extendData.contacts"></jump-select>
    `;
    const options = {
        data() {
            return {
                /*
                * 必须！所有需要返回给后端的字段都要放在extendData对象中
                * */
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
        /*
        * 同example1
        * */
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__tmp"+uniqueId(),
    };
}
export {vm}