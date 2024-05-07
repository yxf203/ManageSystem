import { createRouter,createWebHistory } from "vue-router";
import LoginMain from '@/views/Login/LoginMain.vue';
import LoginBox from '@/views/Login/LoginBox.vue'
import RegisterBox from '@/views/Login/RegisterBox.vue'
import MainPage from '@/views/Main/MainPage.vue'
// 货品管理
import ManageGoods from '@/views/Main/ManageGoods/ManageGoods.vue';
// 销售业务
import CheckBill from '@/views/Main/SaleBusiness/CheckBill.vue';
import LookBill from '@/views/Main/SaleBusiness/LookBill.vue';
import PassedBill from '@/views/Main/SaleBusiness/PassedBill.vue';
// 仓库管理
import Repertory from '@/views/Main/ManageStore/Repertory.vue';
import RepertoryGraph from '@/views/Main/ManageStore/RepertoryGraph.vue';
const routes = [
    {
        path: '/',
        name: 'loginPage',
        component:LoginMain,
        children: [
            {
                path: '/',
                name: 'login',
                component: LoginBox,
            },
            {
                path: '/register',
                name: 'register',
                component: RegisterBox,
            }
        ]
    },
    {
        path: '/main',
        component: MainPage,
        children: [
            //管理货品
            {
                path: 'manageGoods',
                name: 'manageGoods',
                component: ManageGoods,
            },
            // 销售业务
            {
                path: 'lookBill',
                name: 'lookBill',
                component: LookBill,
            },
            {
                path: 'checkBill',
                name: 'checkBill',
                component: CheckBill,
            },
            {
                path: 'passedBill',
                name: 'passedBill',
                component: PassedBill,
            },
            // 仓库管理
            {
                path: 'repertory',
                name: 'repertory',
                component: Repertory,
            },
            {
                path: 'repertoryGraph',
                name: 'repertoryGraph',
                component: RepertoryGraph,
            }
        ]
    },
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router