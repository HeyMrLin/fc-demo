import {handleLayout} from './handle/handle'
import table_100601 from './table_100601'
import table_110101 from './table_110101'
import table_100007 from './table_100007'
import table_100907 from './table_100907'
import table_100015 from './table_100015'
import table_100016 from './table_100016'
import table_100012 from './table_100012'
import table_100021 from './table_100021'
import table_100108 from './table_100108'


/*
* 如需自定义单个form的布局，则需像表单100009那样使用，并指定isLayout = true
* */


const config = new Map([
    [100108,{obj:table_100108,name:"其它证明文件"}],
    [100021,{obj:table_100021,name:"专利代理委托书（中英文）"}],
    [100012,{obj:table_100012,name:"意见陈述书"}],
    [100016,{obj:table_100016,name:"著录项目变更申报书"}],
    [100015,{obj:table_100015,name:"更正错误请求书"}],
    [100601,{obj:table_100601,name:"放弃专利权声明"}],
    // [100009,{obj:handleLayout(table_100009,{labelWidth:"140px", span:24}),name:"延长期限请求书",isLayout:true}],
    [110101,{obj:table_110101,name:"发明专利请求书"}],
    [100007,{obj:table_100007,name:"专利代理委托书"}],
    [100907,{obj:table_100907,name:"复审程序授权委托书"}],
]);


const layout = {labelWidth:"120px", span:24};
[...config.values()].forEach((item)=>{
    if(!item.isLayout){
        handleLayout(item.obj,layout);
    }
});
export default config
