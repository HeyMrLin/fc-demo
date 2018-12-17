// 更正错误请求书
import {vm as correction_content_vm} from '../formTemplate/correction-content'

let rule = [
    {
        type: "input", title: "申请号", field: "patent_nufwamber", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "tifwatle", value: "",
    },
    {
        type: "input", title: "申请人/权利人", field: "apfwaplicants", value: "",
    },
    {
        type: "select", title: "代理机构", field: "agefewancy", value: "",request: true, url: "",
    },
    {
        type: "select", title: "附件", field: "attacfwahments", value: "",request: true, url: "",
    },
    {
        type: "span", title: "备案", field: "recofewards", value: "",
        col:{
            span:4
        }
    },
    {
        type: "input", title: "备案文件名称", field: "filenfewaame", value: "",
        col:{
            span:10
        }
    },
    {
        type: "input", title: "备案文件编号", field: "ffewaileno", value: "",
        col:{
            span:10
        }
    },
    correction_content_vm(),
]

const content = {
    rule
}

export default content
