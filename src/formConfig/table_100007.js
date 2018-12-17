// 专利代理委托书
import {handleSingle} from "./handle/handle";

let rule = [
    {
        type:"checkbox",title:"声明",field:"poa_declaration",value:[],
        options:[
            {value:1,label:"声明填写的专利代理委托信息与专利代理委托书扫描件是一致的"}
        ],
    },
    {
        type:"input",title:"发明创造名称",field:"title",value:"",
    },
    {
        type:"input",title:"申请号/专利号",field:"patent_number",value:"",
    },
    {
        type:"select",title:"委托人",field:"applicants",value:[],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: "",

    },
    {
        type:"checkbox",title:"委托类型",field:"poa_application",value:[],
        options:[
            {value:0,label:"代为办理专利申请或专利在专利权有效期内的全部事务"},
            {value:1,label:"代为办理专利权评价报告或者实用新型专利检索报告"},
        ],
        event:{
            change: handleSingle,
        }
    },
    {
        type:"select",title:"代理机构",field:"agency",value:[],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: "",

    },
    {
        type:"select",title:"代理人",field:"agents",value:[],
        props: {
            multiple: true,
            filterable: true,
            "multiple-limit":2,
        },
        request: true,
        url: "",

    },
]
const content = {
    rule    // rule字段名称不能更改
}

export default content
