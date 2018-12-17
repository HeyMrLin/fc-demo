<template>
    <section>
        <div class="editor-header justify-between">
            <h4 class="title">CPC电子申请编辑器（PI20180006-一种左乙拉西坦药物组合物及其制备方法；补正）</h4>
            <div class="btn-group">
                <el-button type="primary" @click="saveData" size="small">保存</el-button>
                <el-button type="primary" size="small">退回</el-button>
                <el-button type="primary" size="small">提交</el-button>
            </div>
        </div>
        <div class="editor-primary" style="height:800px" v-loading="loading"
             element-loading-text="表单加载中">
            <div class="editor-append">
                <div class="editor-append-handle">
                    <div class="append-form-header justify-between">
                        <span>申请表格</span>
                        <el-button type="text" size="mini" icon="el-icon-plus" @click="addForm">新增
                        </el-button>
                    </div>
                    <div class="append-form-list">
                        <!--添加的表格名称列表-->
                        <ul class="form-list">
                            <li class="form-list-item justify-between" :ref="`index_${index}`" :data-id="item.id"
                                :class="{'gray-bg':formType === item.id}"
                                v-on:mouseleave="changeStyle(index,false)"
                                v-on:mouseenter="changeStyle(index,true)" v-for="(item,index) in formList"
                                @click="openForm(item.id,index)">
                                <span>{{item.name}}</span>
                                <el-button @click.stop="removeForm(index,item.id)"
                                           :class="{'show-remove':isShowRemoveBtn && index === isShowIndex}" type="text"
                                           size="mini" icon="el-icon-close"></el-button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="editor-attachment">
                    <!--文件及附件-->
                </div>
            </div>
            <div class="editor-content">
                <!--表单主体部分-->
                <div ref="fc" id="form-create"></div>
            </div>
            <div class="editor-other"></div>
        </div>
        <el-dialog title="添加表格" :visible.sync="showAppendForm">

            <el-form>
                <el-form-item label="请选择">
                    <el-select v-model="formTypeCollection" multiple filterable>
                        <el-option v-for="item in selectOptions"
                                   :key="item.value"
                                   :disabled="item.disabled"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="renderForm">确定</el-button>
                    <el-button @click="()=>{showAppendForm = false}">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </section>
</template>

<script>
    import formConfig from '@/formConfig/main'
    import {handlePlaceholder, handleSingle} from '@/formConfig/handle/handle'
    import Vue from 'vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'ApplicationEditor',
        data() {
            return {
                showAppendForm: false,
                formList: [],   // 左侧表单列表
                isShowRemoveBtn: true,
                isShowIndex: 1000,
                loading: false,
                $f: null,
                instance_arr: [],
                model: {},
                current: '',
                formType: '',
                formTypeCollection: [],
                rules: [],
                vm_collection: new Map(),
                allData: {},
                submitData: new Map(),
                isValidate:false,
                count: 0,

            }
        },
        computed: {
            selectOptions: function () {
                return [...formConfig.entries()].map((item) => {
                    let idList = this.formList.map((item)=>{
                        return item.id;
                    })
                    let bool = idList.indexOf(item[0]) !== -1 ? true : false;
                    return {value: item[0], label: item[1].name ,disabled:bool}
                })
            },
            vm_collection_id: function () {
                let temp = this.count
                return [...this.vm_collection.keys()]
            }
        },
        mounted() {

        },
        methods: {
            openForm(id, index, isRemove = false) {
                if (id === this.formType) return
                this.$f.validate(this.successValidate(isRemove), this.errorValidate);
                if(!this.isValidate)return
                this.loading = true
                this.current = index
                let target = formConfig.get(id)
                this.rules = handlePlaceholder(target.obj.rule)
                this.formType = id
                this.mergeRule(this.rules)
                // this.paddingData(this.data,this.rules);
                this.createForm()

            },
            changeStyle(index, isShow) {
                this.isShowRemoveBtn = isShow
                this.isShowIndex = index
            },
            // 移除表单
            removeForm(index, id) {
                // 修改样式
                if (id === this.formType) {
                    let el
                    let prev_id
                    if (index === 0 && this.formList.length === 1) {
                        this.$f.destroy()
                        this.$f = null
                    } else if (index === 0 && this.formList.length > 1) {
                        el = this.$refs[`index_${index + 1}`]
                        prev_id = Number(el[0].attributes['data-id'].value)
                        this.openForm(prev_id, index + 1, true)
                    } else if (index !== 0 && this.formList.length > 1) {
                        el = this.$refs[`index_${index - 1}`]
                        prev_id = Number(el[0].attributes['data-id'].value)
                        this.openForm(prev_id, index - 1, true)
                    }
                }

                this.submitData.delete(id)
                this.formList.splice(index, 1)
                this.vm_collection_id.forEach((item) => {
                    if (String(item).indexOf(id) !== -1) {
                        this.vm_collection.delete(item)
                    }
                })
                // console.log('this.vm_collection', this.vm_collection)
                this.count++
            },

            // 合成规则
            mergeRule(source) {
                this.setOptions(source)
                source.map((item, index) => {
                    if (item._vm) {
                        this.setVmCollection(item._vm)
                    } else if (item.custom) {
                        source[index] = this.makeMarker(item)
                    } else if (item.request) {
                        this.setSelectData(item, index)
                    }
                })
            },

            // 处理upload组件的url
            handleUploadUrl(url){
                return `${url}/test`
            },

            setOptions(source) {
                source.forEach((item) => {
                    if (item.type && item.type === 'select') {
                        !item.options ? this.$set(item, "options", []) : ''
                    }
                })

            },

            setVmCollection(vm) {
                // 一个规则里面有多个自定义组件的时候要给vm_collection的key加后缀
                if (this.vm_collection.has(this.formType)) {
                    this.vm_collection.set(`${this.formType}_${++this.count}`, vm)
                } else {
                    this.vm_collection.set(this.formType, vm)
                }
                this.count++
            },

            // 生成自定义组件
            makeMarker(source) {
                const vm = new Vue(source.vm)
                if(source.field === "__upload"){
                    // 集中处理upload组件的url
                    vm.action = this.handleUploadUrl(vm.action);
                }
                this.setVmCollection(vm)
                return this.$formCreate.maker.createTmp(source.template, vm, source.field, source.label, source.col)
            },

            // 设置select打开下拉框事件，因为渲染函数on事件不支持修饰符，所以现在需要频繁请求，解决方法是使用缓存
            setSelectData(item) {
                let func = () => {
                    this.querySelectData(item.url).then((d) => {
                        item.options = d
                    })
                }
                if (item.event) {
                    item.event['visible-change'] = func
                } else {
                    item.event = {}
                    item.event['visible-change'] = func
                }

            },

            // 获取select框数据
            // TODO url要在这里做个处理
            querySelectData(url) {
                return new Promise((resolve, reject) => {
                    // setTimeout是示例，下面注释的是生产环境下的
                    setTimeout(() => {
                        const option = [
                            {value: 1, label: '第一个'},
                            {value: 2, label: '第二个'},
                            {value: 3, label: '第三个'},
                        ]
                        resolve(option)
                    }, 200)
                    /*const success = _ => {
                        let data = _.projects.map((item) => {
                            return {value: item.id, label: item.name}
                        })
                        resolve(data)
                    }
                    this.$axiosGet({
                        url: `/projects?keyword=&listOnly=1`,
                        data: Object.assign({}),
                        success,
                    })*/
                })
            },

            addForm() {
                this.formTypeCollection = [];
                this.showAppendForm = true
                this.$f ? this.$f.submit() : ''
            },

            renderForm() {
                this.loading = true
                this.showAppendForm = false
                this.formTypeCollection.filter((item) => {
                    return JSON.stringify(this.formList).indexOf(item) === -1
                }).forEach((item) => {
                    this.formList.push({id: item, name: formConfig.get(item).name})
                    this.formType = item
                    this.loadFormData()
                })
            },

            // 点击确定时加载表单生成规则
            loadFormData() {
                let target = formConfig.get(this.formType)
                this.rules = handlePlaceholder(target.obj.rule)
                this.mergeRule(this.rules)
                // this.paddingData(this.data,this.rules);
                this.createForm()
                this.$f.submit()
            },

            // TODO 数据填充应该会有问题，对于upload类型的还没做处理
            // 填充数据
            paddingData(data, rules) {
                rules.forEach((rule) => {
                    if (rule.rule && rule.rule._vm) {
                        let temp = rule.rule._vm.extendData
                        for (let extendKey in temp) {
                            if (temp.hasOwnProperty(extendKey)) {
                                if (Array.isArray(temp[extendKey])) {
                                    temp[extendKey] = data[extendKey] ? data[extendKey] : []
                                } else {
                                    temp[extendKey] = data[extendKey] ? data[extendKey] : ''
                                }
                            }
                        }
                    } else {
                        rule.value = data[rule.field] ? data[rule.field] : ''
                    }
                })
            },

            createForm() {
                let _this = this
                const root = this.$refs.fc
                root.innerHTML = ''
                this.$f = this.$formCreate(
                    this.rules,
                    {
                        el: root,
                        resetBtn: false,
                        submitBtn: false,
                        mounted: () => {
                            _this.loading = false
                        },
                        onSubmit: function (formData) {
                            // TODO 每次加载带自定义组件的表单时，数据才会双向绑定
                            if (_this.submitData.size === 0) {
                                _this.allData = {};
                                [..._this.vm_collection.values()].map((item) => {
                                    Object.assign(_this.allData, item.extendData)

                                })
                                Object.assign(_this.allData, formData)
                                //console.log(_this.allData)
                                _this.submitData.set(_this.formType, _this.allData)
                            } else {
                                _this.vm_collection_id.forEach((item) => {
                                    if (String(item).indexOf(_this.formType) !== -1) {
                                        if (!_this.submitData.get(_this.formType)) {
                                            _this.submitData.set(_this.formType, Object.assign(_this.vm_collection.get(item).extendData, formData))
                                        } else {
                                            Object.assign(_this.submitData.get(_this.formType), _this.vm_collection.get(item).extendData, formData)
                                        }
                                    } else {
                                        _this.submitData.set(_this.formType, formData)
                                    }
                                })
                                _this.vm_collection_id.length === 0 ? _this.submitData.set(_this.formType, formData):""
                            }
                        }
                    })

            },
            saveData() {
                this.$f.validate(this.successValidate, this.errorValidate)
                console.log(this.submitData)

            },
            successValidate(bool = false) {
                !bool ? this.$f.submit() : ""
                this.isValidate = true
            },
            errorValidate() {
                this.$message({type: "warning", message: "请正确填写!"})
                this.isValidate = false
            }
        },
    }
</script>

<style scoped>
    .editor-header {
        height: 36px;
        background-color: #fff;
        padding: 0 6px;
    }

    .editor-header .title {

    }

    .editor-header .btn-group {

    }

    .editor-primary {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-top: 4px;
    }

    .editor-append {
        width: 240px;
    }

    .editor-content {
        flex: 1;
        width: 100%;
        overflow-y: auto;
    }

    .editor-other {
        width: 360px;
    }

    .append-form-header {
        height: 36px;
        background-color: #eee;
        font-size: 14px;
        padding: 0 4px;
    }

    .append-form-list {
        min-height: 200px;
    }

    .append-form-list .form-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .append-form-list .form-list-item {
        list-style-type: none;
        font-size: 14px;
        padding: 6px 6px;
        cursor: pointer;
        height: 28px;
        color: #606266;
    }

    .append-form-list .form-list-item:hover {
        color: #409EFF;
        background-color: #efefef;
    }

    .gray-bg {
        background-color: #f3f3f3;
    }

    .append-form-list .form-list-item button {
        display: none;
    }

    .append-form-list .form-list-item .show-remove {
        display: block;
    }

    .justify-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
<style>
    .rd_class .el-input {
        width: 160px;
    }

    .rd_class .el-input .el-input__inner {
        height:30px;
        width: 160px;
    }

    .custom-checkbox .el-checkbox {
        display: inherit;
    }

    .custom-checkbox .el-checkbox + .el-checkbox {
        margin-left: 0;
        white-space: inherit;
    }

    .custom-checkbox .el-checkbox__label {
        display: initial;
    }

    .form-create .el-date-editor.el-input {
        width: auto;
    }

    .custom-none {
        display: none;
    }
    .form-create .placeholder {
        height: 36px;
        display: block;
    }
</style>
