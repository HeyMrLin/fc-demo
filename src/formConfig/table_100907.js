// 复审程序授权委托书
let rule = [
    {
        type: "input", title: "专利号", field: "patent_number", value: "",
        col: {
            span: 12
        }
    },
    {
        type: "input", title: "案件编号", field: "board_number", value: "",
        attrs:{
            placeholder:"请输入复审委案件编号",
        },
        col: {
            span: 12
        }
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "input", title: "复审请求人(委托人）", field: "applicants", value: "",
    },
    {
        type: "input", title: "被委托人", field: "agency", value: "",
        attrs:{
            placeholder:"请输入代理机构"
        }
    },
    {
        type: "input", title: "", field: "agents", value: "",
        attrs:{
            placeholder:"请输入代理人"
        }
    },
    {
        type: "input", title: "委托权限", field: "agent_one_previlege", value: "",
        attrs:{
            placeholder:"请输入第一代理人的代理权限"
        }
    },
    {
        type: "input", title: "", field: "agent_two_previlege", value: "",
        attrs:{
            placeholder:"请输入第二代理人的代理权限"
        }
    },
    // TODO 少个上传文件
]

const content = {
    rule
}

export default content