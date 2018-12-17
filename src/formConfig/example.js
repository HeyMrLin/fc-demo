/*
* handle中是一些处理表单生成规则的公共方法
* 如没用到handleSingle可不引用
* */
import {handleSingle} from "./handle/handle";

/*
*  statement和JumpSelect为自定义组件示例
*  如没用到handleSingle可不引用
* */
import {vm as statement} from '../formTemplate/statement'
import {vm as JumpSelect} from '../formTemplate/jump-select'

/*
* 规则变量为Array类型
* 变量名为rule
* 下列注释中的E为:同Element UI
* */

let rule = [
    /*
    * text类型
    * */
    {
        type: "span",
        title: "根据专利法第34条的规定，请求早日公布下列发明专利申请",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
    },
    /*
    * input类型
    * */
    {
        type: "input",   // 必填，文本框的类型
        /*
        * title，非必填
        * 该字段为form-item的label
        * 为空的情况下labelWidth依然有效
        * 可用在一些需要占用两行的form-item上
        * */
        title: "申请人",
        field: "applicant",    // 必填，该字段为传给后端的数据的字段，在rule数组中必须唯一
        value: "",    // 必填，field字段的值，需要指定数据类型(多选的select为[])
        /*
        * col对象为form-item的布局,可不填
        * 全局有默认值，labelPosition为"left"
        * 如需针对单个完整表单，则需在main.js中针对单个文件制定规则
        * 如需自定义单个form-item则只针对labelWidth和span
        * */
        col: {
            labelWidth: "",   // E
            labelPosition: "",   // E
            span: "",   // E 中的:span
        },
        /*
        * attrs为普通的 HTML 特性
        * 详情请看vue渲染函数
        * 其中placeholder有默认值，
        * input类型的默认值为——请输入+title
        * select类型的默认值为——请选择+title
        * 如需自定义请填写
        * */
        attrs: {
            placeholder: "请输入申请人xxx"
        },
        /*
        * 表单验证规则
        * 同Element UI
        * 暂不支持自定义组件的验证
        * */
        validate: [
            {required: true, message: '请输入申请人', trigger: 'blur'}
        ]
    },
    /*
    * select类型
    * */
    {
        type: "select",  // 必填
        title: "",   // 同上
        field: "",   // 同上
        value: "",   // 同上
        /*
        * props 同Element UI中的Select Attributes
        * */
        props: {
            multiple: true,
            disabled: true,
            filterable: true,
            /**...**/
        },
        request: true,  // 如select的options为后端获取，则需指定request: true
        url: "",     // 如select的options为后端获取，则需指定url,参数会在组件中集中处理
        /*
        * 如无需从后端获取则需指定options
        * */
        options: [
            {'value': 104, 'label': '权利要求书'},
            {'value': 105, 'label': '说明书'},
            {'value': 106, 'label': '说明书附图'},
        ],
    },
    /*
    * checkbox类型
    * */
    {
        type: "checkbox",    // 必填
        title: "",   // 同上
        field: "",   // 同上
        value: "",   // 同上
        /*
        * options为CheckBox的选项
        * */
        options: [
            {value: 1, label: '第一个'},
            {value: 2, label: '第二个'}
        ],
        /*
        * event为CheckBox绑定的事件
        * */
        event: {
            /*
            * 如只需单选，则使用handleSingle方法
            * 如需自定义，则在该配置的.js文件中自定义
            * */
            change: handleSingle,
        }
    },
    /*
    * 自定义组件
    * 详情在formTemplate文件夹中example1.js
    * 主要用在一些不规则的CheckBox和需要将form-item变异成其它组件的场景
    * 自定义组件在rule中的位置就是它在form中的位置
    * */
    statement,
    /*
    * 带参数的自定义组件
    * 具体参数自定义
    * 详情在formTemplate文件夹中example2.js
    * 使用场景：当子组件中有大量公共部分可以使用时
    * */
    JumpSelect(...arg),
];

/*
* content为输出对象
* 指定为对象是因为可能会拓展方法
* */
const content = {
    rule    // rule字段名称不能更改
}

export default content