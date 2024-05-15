import { createRouter,createWebHistory } from "vue-router";
import LoginMain from '@/views/Login/LoginMain.vue';
import LoginBox from '@/views/Login/LoginBox.vue'
import RegisterBox from '@/views/Login/RegisterBox.vue'
import MainPage from '@/views/Main/MainPage.vue'
// 仓库管理
import ManageRepe from '@/views/Main/ManageRepe/ManageRepe.vue';
// 业务伙伴管理
import ManageCust from '@/views/Main/ManageCompanion/ManageCust.vue';
import ManageSuppliers from '@/views/Main/ManageCompanion/ManageSuppliers.vue';
// 用户管理
import ManageUser from '@/views/Main/ManageUser/ManageUser.vue';
// 销售业务
import CheckBill from '@/views/Main/SaleBusiness/CheckBill.vue';
import LookBill from '@/views/Main/SaleBusiness/LookBill.vue';
import POS from '@/views/Main/SaleBusiness/POS.vue';
// 采购业务
import ManagePurchase from '@/views/Main/PurchaseBusiness/ManagePurchase.vue';
import CheckPurchase from '@/views/Main/PurchaseBusiness/CheckPurchase.vue';
// 库存管理
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
            {
                path: 'manageRepe',
                name: 'manageRepe',
                component: ManageRepe,
            },
            //管理合作伙伴
            {
                path: 'manageCust',
                name: 'manageCust',
                component: ManageCust,
            },
            {
                path: 'manageSuppliers',
                name: 'manageSuppliers',
                component: ManageSuppliers,
            },
            //用户管理
            {
                path: 'manageUser',
                name: 'manageUser',
                component: ManageUser,
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
                path: 'pos',
                name: 'pos',
                component: POS,
            },
            // 采购业务
            {
                path: 'managePurchase',
                name: 'managePurchase',
                component: ManagePurchase
            },
            {
                path: 'checkPurchase',
                name: 'checkPurchase',
                component: CheckPurchase
            },
            // 库存管理
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