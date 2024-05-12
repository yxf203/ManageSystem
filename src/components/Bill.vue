<template>
    <!-- 销售单预览 -->
    <el-dialog v-model="previewBillVis" title="销售单预览" width="1100px">
        <div class="billPreview">
            <h2>销售单</h2>
            <p>单号：{{ props.billData.id }}</p>
            <table width="1000px" class="tableStyle">
                <tr class="consigneeLine">
                    <td :colspan="2">客户名称:{{ props.billData.consigneeName }}</td>
                    <td :colspan="2">联系方式:{{ props.billData.phone }}</td>
                    <td :colspan="2">客户地址:{{ props.billData.address }}</td>
                    <td :colspan="2">日期: {{ dayjs().format('YYYY-MM-DD') }}</td>
                </tr>
                <tr>
                    <th>序号</th>
                    <th>货品编号</th>
                    <th>货品名称</th>
                    <th>包装规格</th>
                    <th>数量</th>
                    <th>单价</th>
                    <th>金额</th>
                    <th>备注</th>
                </tr>
                <tr v-for="(item, index) in props.billData.billDetail">
                    <th>{{ index + 1 }}</th>
                    <th>{{ item.id }}</th>
                    <th>{{ item.name }}</th>
                    <th>{{ item.decri }}</th>
                    <th>{{ item.number }}</th>
                    <th>{{ item.singlePrice }}</th>
                    <th>{{ item.total.toFixed(2) }}</th>
                    <th>{{ item.extra }}</th>
                </tr>
                <tr>
                    <th :colspan="6" style="text-align: left;padding-left: 7px;">总金额（大写）：{{ charTotal }}</th>
                    <th>{{ totalMoney }}</th>
                    <th></th>
                </tr>
                <tr style="text-align: left;">
                    <th :colspan="5" style="padding-left: 7px;">审核人：</th>
                    <th :colspan="3" style="padding-left: 7px;">审核日期：</th>
                </tr>
            </table>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import { digitUppercase } from "pixiu-number-toolkit";
const props = defineProps(["billData"]);
const previewBillVis = ref(false);
const totalMoney = ref(0);
const charTotal = ref('');

previewBillVis.value = true;
totalMoney.value = 0;
props.billData.billDetail.value.forEach(x => totalMoney.value += x.total);
totalMoney.value = totalMoney.value.toFixed(2);
charTotal.value = digitUppercase(totalMoney.value);
</script>

<style lang="scss" scoped>
// 销售单样式
.billPreview {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    font-size: 18px;
    padding: 20px 0 50px;
    border: 1px solid #000;border: 1px solid #000;
    p {
        align-self: flex-end;
        margin-right: 50px;
    }
    table {
        border-collapse: collapse;
        .consigneeLine {
            td {
                padding-left: 7px;
            }
        }
        th,
        td {
            border: 1px solid #000;
            border-collapse: collapse;
        }
    }
}
</style>