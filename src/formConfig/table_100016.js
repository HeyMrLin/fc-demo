// 著录项目变更申报书
import {vm as change_reason_vm} from '../formTemplate/change-reason'
import {vm as change_content_vm} from '../formTemplate/change-content-100016'

const attachments = [{value: 1, label: '双方当事人签章的权利转移协议书'}, {value: 2, label: '全体权利人同意转让的证明材料'}, {value: 3, label: '全体权利人同意赠与的证明材料'}, {
    value: 4,
    label: '双方当事人签字或盖章的说明变更理由的证明文件'
}, {value: 5, label: '上级主管部门或当地工商行政管理部门出具的变更名称的证明文件'}, {value: 6, label: '户籍管理部门出具的更改姓名的证明文件'}, {
    value: 7,
    label: '公证机关证明继承人合法地位的公证书'
}, {value: 8, label: '地方知识产权管理部门的调解书'}, {value: 9, label: '人民法院的判决书或者调解书'}, {value: 10, label: '国务院商务主管部门出具的证明文件'}, {
    value: 11,
    label: '变更后申请人或者专利权人的专利代理委托书'
}, {value: 12, label: '公证材料'}, {value: 13, label: '其他附件'}]
let rule = [
    {
        type: "input", title: "申请号", field: "patent_numbfewaer", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "patefewant_title", value: "",
    },
    {
        type: "select", title: "申请人", field: "applicanfewats", value: "", request: true, url: "",
    },
    {
        type: "span", title: "变更后提交人", field: "placfewaeholder", value: "",
        col: {
            span: 4
        }
    },
    {
        type: "input", title: "用户代码", field: "efs_cfewaode", value: "",
        col: {
            span: 10
        },
        attrs: {
            placeholder: "输入电子申请用户代码"
        }
    },
    {
        type: "input", title: "用户名称", field: "efs_nfewaame", value: "",
        col: {
            span: 10
        },
        attrs: {
            placeholder: "输入电子申请用户名称"
        }
    },
    {
        type: "select", title: "代理机构", field: "agefewancy", value: "", request: true, url: "",
    },
    change_reason_vm("变更原因"),
    change_content_vm(),
    {
        type: "select", title: "附件", field: "attafewachments", value: [], options:[],
        props:{
            multiple: true,
            filterable: true,
        },
    },
]


const content = {
    rule
}

export default content
