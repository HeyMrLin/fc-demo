// 专利代理委托书（中英文）
import {vm as upload_vm} from '../formTemplate/Upload'

const proceeding = [
    {value:1,label:"代为办理专利申请或专利在专利权有效期内的全部事务"},
    {value:2,label:"代为办理实用新型专利检索报告"},
    {value:3,label:"代为办理专利权评价报告"},
]
let rule = [
    {
        type: "select", title: "委托人", field: "applics", value: "", request: true, url: "",
    },
    {
        type: "input", title: "委托人英文名称", field: "sgtrs", value: "",
    },
    {
        type: "select", title: "委托事项", field: "poagrsype", value: "",
        options:proceeding
    },
    {
        type:"select",title:"代理机构",field:"aggresengresgcy",value:[],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: "",

    },
    {
        type:"select",title:"代理人",field:"agresgregents",value:[],
        props: {
            multiple: true,
            filterable: true,
            "multiple-limit":2,
        },
        request: true,
        url: "",

    },
    upload_vm({label:"委托书扫描件",url:"/url",tip:"上传专利委托书",type:"file"}),
]


const content = {
    rule
}

export default content
