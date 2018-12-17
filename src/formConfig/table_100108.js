// 其它证明文件
import {vm as upload_vm} from '../formTemplate/Upload'

let rule = [
    {
        type: "input",title: "申请人",field: "patmber",value: "",
    },
    upload_vm({label:"图片",url:"/url",tip:"",type:"picture"}),

]
const content = {
    rule    // rule字段名称不能更改
}

export default content
