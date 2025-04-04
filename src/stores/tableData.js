import { defineStore } from "pinia";
export const useTableDataStore = defineStore('tableData',{
    state: () => ({
            tableData: [
                {
                    name: '可乐',
                    specification: '500ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '未上架',
                    goodsId: '98562135451020',
                    date: '2023-10-20 18:08',
                    sale: 0,
                },
                {
                    name: '可乐',
                    specification: '300ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451019',
                    date: '2023-10-20 16:28',
                    sale: 0,
                },
                {
                    name: '可乐',
                    specification: '200ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451018',
                    date: '2023-10-20 16:18',
                    sale: 0,
                },
                {
                    name: '可乐',
                    specification: '1500ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451017',
                    date: '2023-10-20 16:16',
                    sale: 0,
                },
                {
                    name: '雪碧',
                    specification: '500ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451016',
                    date: '2023-10-19 18:00',
                    sale: 0,
                },
                {
                    name: '雪碧',
                    specification: '300ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451015',
                    date: '2023-10-29 18:00',
                    sale: 0,
                },
                {
                    name: '雪碧',
                    specification: '200ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451014',
                    date: '2023-10-19 18:00',
                    sale: 0,
                },
                {
                    name: '雪碧',
                    specification: '1500ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451013',
                    date: '2023-10-19 17:08',
                    sale: 0,
                },
                {
                    name: '七喜',
                    specification: '500ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451012',
                    date: '2023-10-18 16:08',
                    sale: 0,
                },
                {
                    name: '七喜',
                    specification: '300ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451011',
                    date: '2023-10-18 16:00',
                    sale: 0,
                },
                {
                    name: '七喜',
                    specification: '200ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451010',
                    date: '2023-10-18 15:38',
                    sale: 0,
                },
                {
                    name: '七喜',
                    specification: '1500ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451009',
                    date: '2023-10-18 15:28',
                    sale: 0,
                },
                {
                    name: '沙士',
                    specification: '500ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451008',
                    date: '2023-10-17 16:38',
                    sale: 0,
                },
                {
                    name: '沙士',
                    specification: '300ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451007',
                    date: '2023-10-17 16:38',
                    sale: 0,
                },
                {
                    name: '沙士',
                    specification: '200ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451006',
                    date: '2023-10-17 16:38',
                    sale: 0,
                },
                {
                    name: '沙士',
                    specification: '1500ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451005',
                    date: '2023-10-17 16:38',
                    sale: 0,
                },
                {
                    name: '阿萨姆奶茶',
                    specification: '500ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451004',
                    date: '2023-10-16 15:00',
                    sale: 0,
                },
                {
                    name: '阿萨姆奶茶',
                    specification: '300ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451003',
                    date: '2023-10-16 15:00',
                    sale: 0,
                },
                {
                    name: '阿萨姆奶茶',
                    specification: '200ml',
                    repertory: 99980,
                    // type: "原味",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451002',
                    date: '2023-10-16 15:00',
                    sale: 0,
                },
                {
                    name: '阿萨姆奶茶',
                    specification: '1500ml',
                    repertory: 99980,
                    // type: "无糖",
                    price: 5,
                    state: '已上架',
                    goodsId: '98562135451001',
                    date: '2023-10-16 15:00',
                    sale: 0,
                }],
        })
    ,
    actions:{
        addGoods(item) {
            this.tableData.unshift(item);
        },
        deleteGoods(id){
            this.tableData = this.tableData.filter(x => x.goodsId !== id);
        },
        changeState(id){
            this.tableData.forEach(x => {
                if (x.goodsId === id) {
                    if (x.state === '已上架') x.state = '未上架';
                    else x.state = '已上架';
                }
            })
        },
        changeRepertory(list, flag){
            list.forEach(x => {
                console.log(x);
                this.tableData.forEach(item => {
                    if(item.goodsId === x.goodsId){
                        item.repertory += flag * x.amount;
                        item.sale += -1 * flag * x.amount;
                    }
                })
            })
        }
    },
})