//发明专利请求书
import {vm as statement} from '../formTemplate/statement'
import {vm as priority} from '../formTemplate/priority'
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'
import {handleSingle} from './handle/handle'

const address = [
    {detail: 'ABC-高级生物技术中心', address: '意大利', value: 'ABC'},
    {detail: 'ATCC-美国典型培养物保藏中心', address: '美国', value: 'ATCC'},
]
const novelty_claims = {
    novelty_exception_exhibition:"已在中国政府主办或承认的国际展览会上首次展出",
    novelty_exception_published:"已在规定的学术会议或技术会议上首次发表",
    novelty_exception_leakage:"他人未经申请人同意而泄露其内容",
}
function handleLinkage(checked) {
    address.forEach((item) => {
        if (item.value === checked) {
            content.rule.forEach((i) => {
                if (i.field === "address") {
                    i.value = item.address;
                }
            })
        }
    })
}

let rule = [
    {
        type: 'input', title: '发明名称', field: 'title', value: '',
    },
    {
        type: 'select', title: '发明人', field: 'inventors', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: '/test',
    },
    {
        type: 'select', title: '申请人', field: 'applicants', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: '/test',
    },
    statement,
    {
        type: 'select', title: '联系人', field: 'contact', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: '/test',
    },
    {
        type: 'select', title: '代理机构', field: 'agency', value: [],
        request: true,
        url: '/test',
        props: {
            multiple: true,
            filterable: true,
        },
    },
    {
        type: 'select', title: '代理人', field: 'agents', value: [],
        request: true,
        url: '/test',
        props: {
            multiple: true,
            filterable: true,
        },
    },
    checkbox_common_vm({poa_declaration:"声明已经与申请人签订了专利代理委托书且本表中的信息与委托书中相应信息一致"},"代理声明","",{labelWidth:"120px"}),
    {
        type: 'select', title: '总委托书编号', field: 'poa', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        attrs: {
            placeholder: '请选择总委托书编号（如果有）'
        },
        request: true,
        url: '/test',
    },
    priority,
    {
        type: 'input', title: '权利要求项数', field: 'claims_count', value: '',
    },
    {
        type: 'input', title: '摘要附图图号', field: 'abstract_figure', value: '',
    },
    {
        type: 'input', title: '分案申请', field: 'division_number', value: '',
        col: {
            span: 12,
        },
    },
    {
        type: 'input', title: '', field: 'division_division_number', value: '',
        attrs: {
            placeholder: '针对的分案申请'
        },
        col: {
            span: 6,
            labelWidth: '0',
        },
    },
    {
        type: 'DatePicker', title: '', field: 'division_apd', value: "",
        col: {
            span: 6,
            labelWidth: '0',
        },
    },
    checkbox_common_vm({bio_alive:"是否存活"},"生物材料样品","",{labelWidth:"120px"}),
    {
        type: 'select', title: '', field: 'bio_deposit_center', value: '',
        props: {
            multiple: false,
            filterable: true,
        },
        options: [
            {'value': 'ABC', 'label': 'ABC-高级生物技术中心'},
            {'value': 'ATCC', 'label': 'ATCC-美国典型培养物保藏中心'},
        ],
        event: {
            change: handleLinkage,
        },
        attrs: {
            placeholder: '请选择生物保藏机构'
        },
        col: {
            span: 14,
            labelWidth: '110px',
        },
    },
    {
        type: 'input', title: '', field: 'bio_desposit_address', value: '',
        attrs: {
            placeholder: '请输入地址'
        },
        col: {
            span: 10,
            labelWidth: '0',
        },
    },
    {
        type: 'DatePicker', title: '', field: 'bio_deposit_date', value: "",
        attrs: {
            placeholder: '请输入保藏日期'
        },
        col: {
            span: 14,
            labelWidth: '110px',
        },
    },
    {
        type: 'input', title: '', field: 'bio_deposit_number', value: '',
        attrs: {
            placeholder: '请输入保藏编号'
        },
        col: {
            span: 5,
            labelWidth: '0',
        },
    },
    {
        type: 'input', title: '', field: 'bio_deposit_species', value: '',
        attrs: {
            placeholder: '请输入分类命名'
        },
        col: {
            span: 5,
            labelWidth: '0',
        },
    },
    checkbox_common_vm({squence_table:"本申请涉及核苷酸或氨基酸序列表"},"序列表","",{labelWidth:"120px"}),
    checkbox_common_vm({inheritance:"本专利申请涉及的发明创造是依赖于遗传资源完成的"},"遗传资源","",{labelWidth:"120px"}),
    checkbox_common_vm({is_utility:"声明本申请人对同样的发明创造在申请本发明专利的同日申请了实用新型专利"},"同日申请","",{labelWidth:"120px"}),
    checkbox_common_vm({prepubic:"请求早日公布该专利申请"},"提前公布","",{labelWidth:"120px"}),
    checkbox_common_vm(novelty_claims,"不丧失新颖性声明","",{labelWidth:"120px"}),
    checkbox_common_vm({subs_exam:"同时提出实质审查请求"},"实质审查","",{labelWidth:"120px"}),
    checkbox_common_vm({confidential_exam:"向国外申请专利保密审查请求"},"保密审查","",{labelWidth:"120px"}),
    // TODO 附件要配置
    {
        type: 'select', title: '附件（非必填）', field: 'attachments', value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        options: [
            {'value': 104, 'label': '权利要求书'},
            {'value': 105, 'label': '说明书'},
            {'value': 106, 'label': '说明书附图'},
        ],
    },
    {
        type: 'input', title: '证明文件备案号', field: 'document_number', value: [],
        attrs: {
            placeholder: '请选择总委托书编号（如果有）'
        },
        request: true,
        url: '/test',
    },
];
const content = {
    rule
}

export default content
