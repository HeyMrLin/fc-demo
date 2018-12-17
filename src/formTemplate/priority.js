/*
* 优先权
* */
import axios from 'axios'

const template = `
<div>
    <el-row>
        <el-col :span="20">
            <el-select style="display: inline-block; width: 90%" type="text" multiple v-model="priority_copy">
                <el-option
                    v-for="item in priority_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="add" plain>新增</el-button>
        </el-col>
    </el-row>
    
    
    <el-dialog title="新增优先权" :visible.sync="isVisible" custom-class="priority_dialog" :append-to-body="true" :modal="false">
        <el-form :model="form" label-position="left" label-width="110px">
            <el-form-item label="优先权国家">
                <el-select v-model="form.area">
                    <el-option 
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请号">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="申请号">
                <el-date-picker value-format="yyyy-MM-dd" v-model="form.date"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
`

const options = {
    data () {
        return {
            extendData: {
                priority: [],
            },
            priority_copy:[],
            priority_options: [],
            options: [],
            isVisible: false,
            form: {
                area: '',
                id: '',
                date: '',
            }
        }
    },
    computed: {},
    methods: {
        add () {
            this.controlDialog('block')
            const url = '/static/js/area.json'
            axios.get(url).then(response=>{
                this.options = eval(`${response.data}`);
            })
        },
        save () {
            let label = `[${this.form.area}]${this.form.id}-${this.form.date}`
            let value = this.form.id
            this.verifyValue(value) ? this.priority_options.push({label: label, value: value}) : ''
            if(!this.priority_copy.includes(value)){
                this.priority_copy.push(value);
                this.extendData.priority.push(Object.assign(this.form,{name:label}));
            }
            this.controlDialog('none')
        },
        verifyValue (value) {
            let bool = true
            this.priority_options.forEach((item) => {
                if (item.value === value) {
                    bool = false
                }
            })
            return bool
        },
        cancel () {
            this.controlDialog('none')
        },
        controlDialog (c) {
            this.isVisible = c === 'block' ? true : false
            const parent = document.getElementsByClassName('priority_dialog')[0].parentNode
            parent.style.display = c
        },
    },
}

const vm = {
    custom: true,
    vm: options,
    template: template,
    label: '优先权',
    field: 'priority_vm',
}

export {vm}
