// 意见陈述书
import {vm as state_matters_vm} from '../formTemplate/state-matters-100012'
import {vm as quill_editor_vm} from '../formTemplate/quill-editor'
let rule = [
    {
        type: "input", title: "申请号", field: "patentgres_number", value: "",
    },
    {
        type: "input", title: "发明名称", field: "titgresgrle", value: "",
    },
    {
        type: "select", title: "申请人", field: "apfewaplicants", value: "",
        options: [],
    },
    {
        type: "select", title: "代理", field: "agefewancy", value: "",
        options: [],
    },
    state_matters_vm("陈述事项"),
    {
        type: "select", title: "附件", field: "attachfewaments", value: "", request: true, url: "",
    },
    {
        type: "span", title: "备案", field: "recfewaords", value: "",
        col:{
            span:4
        }
    },
    {
        type: "input", title: "文件名称", field: "filefewaname", value: "",
        col:{
            span:10
        }
    },
    {
        type: "input", title: "文件编号", field: "filferaeno", value: "",
        col:{
            span:10
        }
    },
    quill_editor_vm("opinion","陈述意见")
]

const content = {
    rule,
};
export default content