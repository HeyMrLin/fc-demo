// 变更内容

import axios from 'axios'
function vm() {
    const template = `
        <div>
        <el-button type="text" @click="add">新增</el-button>
        <el-table :data="data"
                  :span-method="cellMerge"
        >
            <el-table-column label="变更项目名称">
                <el-table-column prop="type" label="" label-class-name="custom-none"></el-table-column>
                <el-table-column prop="item" label="" label-class-name="custom-none"></el-table-column>
            </el-table-column>
            <el-table-column label="变更前" prop="before"></el-table-column>
            <el-table-column label="变更后" prop="after"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="isVisible" title="著录项目变更申报书编辑" custom-class="change_content_dialog" :append-to-body="true" :modal="false">
            <el-form :model="form" label-position="left" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="变更内容">
                    <el-select v-model="form.type" @change="changeType">
                        <el-option v-for="item in typeArr"
                                   :label="item.label"
                                   :value="item.value"
                                   :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="变更项目" prop="code">
                    <el-select v-model="form.code">
                        <el-option v-for="item in itemArr"
                                   :label="item.label"
                                   :value="item.value"
                                   :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="变更类型" v-if="form.code === 'gg_zlx_sqr:shenqingrxm'">
                    <el-select v-model="form.leixin">
                        <el-option v-for="item in leixin"
                                   :label="item.label"
                                   :value="item.value"
                                   :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="serialLabel" v-if="form.type === 'applicant'||form.type === 'inventor'">
                    <el-select v-model="form.no">
                        <el-option v-for="item in [1,2,3,4,5,6,7,8,9,10]"
                                   :label="item"
                                   :value="item"
                                   :key="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- 是否代表人 -->
                <template v-if="form.code === 'gg_zlx_sqr:shifoudbrbz'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 申请人类型 -->
                <template v-else-if="form.code === 'gg_zlx_sqr:shenqingrlx'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in applicant_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in applicant_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 国籍或注册国家（地区） -->
                <template v-else-if="form.code === 'gg_zlx_sqr:shenqingrgb'||form.code === 'gg_zlx_fmr:famingegb'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in area_type"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in area_type"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 省份 -->
                <template v-else-if="form.code === 'gg_zlx_sqr:shenqingrsf'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in province_type"
                                       :label="item.name"
                                       :value="item.zipcode"
                                       :key="item.zipcode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in province_type"
                                       :label="item.name"
                                       :value="item.zipcode"
                                       :key="item.zipcode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 城市 -->
                <template v-else-if="form.code === 'gg_zlx_sqr:shenqingrcs'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in city_type"
                                       :label="item.name"
                                       :value="item.zipcode"
                                       :key="item.zipcode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in city_type"
                                       :label="item.name"
                                       :value="item.zipcode"
                                       :key="item.zipcode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 证件类型 -->
                <template v-else-if="form.code === 'gg_zlx_fmr:famingrzjlx'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in certificate_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in certificate_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 不公开标志 -->
                <template v-else-if="form.code === 'gg_zlx_fmr:bugongkbz'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in closedMark_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in closedMark_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 代理类型 -->
                <template v-else-if="form.code === 'gg_zlx_zldl:daililx'">
                    <el-form-item label="变更前" prop="before_code">
                        <el-select v-model="form.before_code">
                            <el-option v-for="item in agency_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-select v-model="form.after_code">
                            <el-option v-for="item in agency_type"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="变更前" prop="before_code">
                        <el-input v-model="form.before_code"></el-input>
                    </el-form-item>
                    <el-form-item label="变更后" prop="after_code">
                        <el-input v-model="form.after_code"></el-input>
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
    `;
    const options = {
        data () {
            return {
                extendData: {
                    applicant: [],
                    inventor: [],
                    agency: [],
                    agent: [],
                    contact: [],
                },
                data: [],
                typeArr: [
                    {value: 'applicant', label: '申请人'},
                    {value: 'inventor', label: '发明人'},
                    {value: 'agency', label: '代理机构'},
                    {value: 'agent', label: '代理人'},
                    {value: 'contact', label: '联系人'},
                ],
                leixin: [
                    {value: 1, label: '转移'},
                    {value: 2, label: '继承'},
                    {value: 5, label: '更名'},
                    {value: 4, label: '其他'},
                ],
                applicant_code: [
                    {value: 'gg_zlx_sqr:shifoudbrbz', label: '是否代表人'},
                    {value: 'gg_zlx_sqr:shenqingrxm', label: '姓名或名称'},
                    {value: 'gg_zlx_sqr:shenqingrywmz', label: '英文名称'},
                    {value: 'gg_zlx_sqr:shenqingrlx', label: '申请人类型'},
                    {value: 'gg_zlx_sqr:shenqingrzjhm', label: '居民身份证件号码或统一社会信用代码/组织机构代码'},
                    {value: 'gg_zlx_sqr:shenqingrgb', label: '国籍或注册国家（地区）'},
                    {value: 'gg_zlx_sqr:shenqingrsf', label: '省份'},
                    {value: 'gg_zlx_sqr:shenqingrcs', label: '城市'},
                    {value: 'gg_zlx_sqr:shenqingryb', label: '邮编'},
                    {value: 'gg_zlx_sqr:shenqingrdz', label: '地址'},
                    {value: 'gg_zlx_sqr:shenqingrywdz', label: '英文地址'},
                    {value: 'gg_zlx_sqr:shenqingrjcjs', label: '经常居所'},
                    {value: 'gg_zlx_sqr:shenqingrdh', label: '电话'},
                    {value: 'gg_zlx_sqr:shenqingrcz', label: '传真'},
                    {value: 'gg_zlx_sqr:shenqingrdzyx', label: '电子邮箱'},
                ],
                inventor_code: [
                    {value: 'gg_zlx_fmr:famingrxm', label: '发明人姓名'},
                    {value: 'gg_zlx_fmr:famingrywm', label: '发明人英文名'},
                    {value: 'gg_zlx_fmr:famingegb', label: '发明人国别'},
                    {value: 'gg_zlx_fmr:famingrzjlx', label: '发明人证件类型'},
                    {value: 'gg_zlx_fmr:famingrzjhm', label: '发明人证件号码'},
                    {value: 'gg_zlx_fmr:bugongkbz', label: '不公开标志'},
                ],
                agency_code: [
                    {value: 'gg_zlx_zldl:dailijgmc', label: '代理机构名称'},
                    {value: 'gg_zlx_zldl:dailijgdm', label: '代理机构代码'},
                    {value: 'gg_zlx_zldl:daililx', label: '代理类型'},
                ],
                agent_code: [
                    {value: 'gg_zlx_zldl:diyidlrgzzh', label: '第一代理人工作证号'},
                    {value: 'gg_zlx_zldl:diyidlrxm', label: '第一代理人姓名'},
                    {value: 'gg_zlx_zldl:diyidlrdh', label: '第一代理人电话'},
                    {value: 'gg_zlx_zldl:dierdlrgzzh', label: '第二代理人工作证号'},
                    {value: 'gg_zlx_zldl:dierdlrxm', label: '第二代理人姓名'},
                    {value: 'gg_zlx_zldl:dierdlrdh', label: '第二代理人电话'},
                ],
                contact_code: [
                    {value: 'gg_zlx_lxr:lianxirxm', label: '联系人姓名'},
                    {value: 'gg_zlx_lxr:lianxirdh', label: '联系人邮编'},
                    {value: 'gg_zlx_lxr:lianxiryb', label: '联系人地址'},
                    {value: 'gg_zlx_lxr:lianxirdz', label: '联系人电话'},
                    {value: 'gg_zlx_lxr:lianxircz', label: '联系人传真'},
                ],
                applicant_type: [
                    {value: 3, label: '工矿企业'},
                    {value: 1, label: '大专院校'},
                    {value: 2, label: '科研单位'},
                    {value: 4, label: '事业单位'},
                    {value: 5, label: '个人'},
                ],
                certificate_type: [
                    {value: 0, label: '身份证'},
                    {value: 1, label: '户口簿'},
                    {value: 2, label: '护照'},
                    {value: 3, label: '军官证'},
                    {value: 4, label: '士兵证'},
                    {value: 5, label: '港澳居民往来内地通行证'},
                    {value: 6, label: '台湾同胞来往内地通行证'},
                    {value: 7, label: '临时身份证'},
                    {value: 8, label: '外国人居住证'},
                    {value: 9, label: '警官证'},
                    {value: 10, label: '港澳台身份证'},
                    {value: 11, label: '回乡证'},
                    {value: 12, label: '驾驶证'},
                    {value: 13, label: '其他证件'},
                    {value: 14, label: '营业执照号'},
                    {value: 15, label: '法人代码证'},
                ],
                closedMark_type: [
                    {value: '', label: '无'},
                    {value: '0', label: '公开'},
                    {value: '1', label: '不公开'},
                ],
                agency_type: [
                    {value: '无代理', label: '无代理'},
                    {value: '全程代理', label: '全程代理'},
                    {value: '半程代理', label: '半程代理'},
                ],

                area_type: [],
                province_type: [],
                city_type: [],
                form: {
                    type: '',
                    code: '',
                    before_code: '',
                    after_code: '',
                    leixin: '',
                    field: '',
                    no: '',
                },
                pos: 0,
                spanArr: [],
                isVisible: false,
                handleCode: new Map([['gg_zlx_sqr:shenqingrlx', 'applicant_type'], ['gg_zlx_sqr:shenqingrgb', 'area_type'], ['gg_zlx_sqr:shenqingrsf', 'province_type'], ['gg_zlx_sqr:shenqingrcs', 'city_type'], ['gg_zlx_fmr:famingegb', 'area_type'], ['gg_zlx_fmr:famingrzjlx', 'certificate_type'], ['gg_zlx_fmr:bugongkbz', 'closedMark_type'], ['gg_zlx_zldl:daililx', 'agency_type']]),
                rules:{
                    before_code:[{ required: true, message: '请输入', trigger: 'blur' },],
                    after_code:[{ required: true, message: '请输入', trigger: 'blur' },],
                    code:[{ required: true, message: '请选择变更项目', trigger: 'blur' },],
                }
            }
        },
        computed: {
            itemArr: function () {
                let arr = []
                switch (this.form.type) {
                    case 'applicant':
                        arr = this.applicant_code
                        break
                    case 'inventor':
                        arr = this.inventor_code
                        break
                    case 'agency':
                        arr = this.agency_code
                        break
                    case 'agent':
                        arr = this.agent_code
                        break
                    case 'contact':
                        arr = this.contact_code
                        break
                }
                return arr
            },
            serialLabel: function () {
                let str = '申请人序号'
                if (this.form.type === 'applicant') {
                    str = '申请人序号'
                } else if (this.form.type === 'inventor') {
                    str = '发明人序号'
                }
                return str
            }
        },
        methods: {
            controlDialog (c) {
                this.isVisible = c === 'block' ? true : false
                const parent = document.getElementsByClassName('change_content_dialog')[0].parentNode
                parent.style.display = c
            },
            mergeData () {
                this.data.sort(function (a, b) {
                    return a.type.localeCompare(b.type)
                })
                this.getSpanArr(this.data)
            },
            deleteRow (index) {
                let remove = this.data.splice(index, 1);
                console.log(remove);
                this.mergeData()
            },
            add () {
                this.controlDialog("block");
            },
            changeType (val) {
                //console.log(val)
            },
            save () {
                this.$refs.form.validate((valid)=>{
                    if(valid) {
                        let type = this.form.type
                        let code = this.form.code
                        this.form.field = this.getField({type, code})
                        this.form.before = this.getField({target: code, code: this.form.before_code})
                        this.form.after = this.getField({target: code, code: this.form.after_code})
                        this.extendData[this.form.type].push(this.form)
                        this.data.push(this.convertData(this.form));
                        this.mergeData();
                        this.controlDialog("none");
                    }else {
                        this.$message({type:"warning",message:"请填写完整"})
                    }
                })

            },
            convertData (source) {
                let table_data_type;
                this.typeArr.forEach((item) => {
                    if (item.value === source.type) {
                        table_data_type = item.label
                    }
                })
                return {
                    type: table_data_type,
                    item: `${table_data_type}${source.field}`,
                    before: source.before,
                    after: source.after
                }
            },
            getField ({type, code, target = ''}) {
                let arr = !target ? this[`${type}_code`] : this[this.handleCode.get(target)]
                if (!arr) {
                    return code
                }
                let obj = arr.filter((item) => {
                    let mark = item.id ? item.id : item.value;
                    mark = !mark ? item.zipcode : mark;
                    if (code === mark) {
                        return true
                    }
                })[0]
                return obj.label ? obj.label : obj.name
            },

            cellMerge ({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            getSpanArr (data) {
                this.spanArr = []
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    } else {
                        if (data[i].type === data[i - 1].type) {
                            this.spanArr[this.pos] += 1
                            this.spanArr.push(0)
                        } else {
                            this.spanArr.push(1)
                            this.pos = i
                        }
                    }
                }
            },
        },

        created () {
            for (let key in this.extendData) {
                if (this.extendData.hasOwnProperty(key)) {
                    this.extendData[key].forEach((item) => {
                        this.data.push(this.convertData(item));
                    })
                }
            }
            this.mergeData()
            const url = '/static/js/area.json'
            axios.get(url).then(response => {
                this.area_type = eval(`${response.data}`)
            })
            axios.get('/static/js/states.json').then(response => {
                this.province_type = eval(`${response.data}`)
                this.province_type.forEach((item) => {
                    item.child.forEach((i) => {
                        this.city_type.push(i)
                    })
                })
            })
        },
        watch: {
            'form.type': function (val, oldVal) {
                this.form.code = null
                this.form.before_code = null
                this.form.after_code = null
            },
            'form.code': function (val, oldVal) {
                this.form.before_code = null
                this.form.after_code = null
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "变更内容",
        field: "__cc",
    };
}

export {vm}