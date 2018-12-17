import Vue from 'vue'
import Router from 'vue-router'
import FormCreate from '@/components/FormCreate'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'FormCreate',
            component: FormCreate
        },
    ]
})
