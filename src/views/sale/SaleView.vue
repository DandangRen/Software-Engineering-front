<template>
  <Layout>
    <Title title="销售管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售单</el-button>
    <el-button type="primary" size="medium" @click="searchVisible = true">查询总金额最大客户</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="pendingLevel1List" :type="1" @refresh="getSale()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="pendingLevel2List" :type="2" @refresh="getSale()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      title="创建销售单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="saleForm" label-width="100px" ref="saleForm" :rules="rules">
          <el-form-item label=" 销售商: " prop="supplier">
            <el-select v-model="saleForm.supplier" placeholder="请选择销售商">
              <el-option
                v-for="item in sellers"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣: " prop="discount">
            <el-input v-model="saleForm.discount"></el-input>
          </el-form-item>
          <el-form-item label="代金券总额: " prop="voucherAmount">
            <el-input v-model="saleForm.voucherAmount"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(item, index) in saleForm.saleSheetContent"
            :key="index"
            :label="'商品' + index">
            <div>
              <el-select v-model="item.pid" placeholder="请选择商品id" style="width: 40%; margin-right: 5%">
                <el-option
                  v-for="item1 in commodityList"
                  :key="item1.id"
                  :label="item1.id"
                  :value="item1.id">
                </el-option>
              </el-select>
              <el-input v-model="item.quantity" style="width: 25%; margin-right: 5%" placeholder="请输入商品数量"></el-input>
              <el-input v-model="item.unitPrice" style="width: 25%;" placeholder="请输入商品单价"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-input v-model="item.remark" style="width: 70%; margin-right: 10%" placeholder="请填写备注"></el-input>
              <el-button type="text" size="small" @click="addProduct" v-if="index === saleForm.saleSheetContent.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="saleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('saleForm')">立即创建</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="查询总金额最大客户"
      :visible.sync="searchVisible"
      width="40%"
      :before-close="handleClose2">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="salesman" label-width="100px">
          <el-form-item label="销售员: " prop="salesman">
            <el-input v-model="salesman" placeholder="请输入销售员姓名"></el-input>
          </el-form-item>
          <el-form-item label = "选择日期:">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getData()">立即查询</el-button>
      </span>
    </el-dialog>
    <el-descriptions title="客户信息" v-if="customerPurchaseAmount !== null && salesman !== ''">
      <el-descriptions-item label="编号">{{this.customerPurchaseAmount.customerPO.id}}</el-descriptions-item>
      <el-descriptions-item label="分类">{{this.customerPurchaseAmount.customerPO.type}}</el-descriptions-item>
      <el-descriptions-item label="级别">{{this.customerPurchaseAmount.customerPO.level}}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{this.customerPurchaseAmount.customerPO.name}}</el-descriptions-item>
      <el-descriptions-item label="电话号码">{{this.customerPurchaseAmount.customerPO.phone}}</el-descriptions-item>
      <el-descriptions-item label="地址">{{this.customerPurchaseAmount.customerPO.address}}</el-descriptions-item>
      <el-descriptions-item label="邮编">{{this.customerPurchaseAmount.customerPO.zipcode}}</el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{this.customerPurchaseAmount.customerPO.email}}</el-descriptions-item>
      <el-descriptions-item label="应收额度">{{this.customerPurchaseAmount.customerPO.lineOfCredit}}</el-descriptions-item>
      <el-descriptions-item label="应收">{{this.customerPurchaseAmount.customerPO.receivable}}</el-descriptions-item>
      <el-descriptions-item label="应付">{{this.customerPurchaseAmount.customerPO.payable}}</el-descriptions-item>
      <el-descriptions-item label="默认业务员">{{this.customerPurchaseAmount.customerPO.operator}}</el-descriptions-item>
      <el-descriptions-item label="总金额">{{this.customerPurchaseAmount.totalFinalAmount}}</el-descriptions-item>
    </el-descriptions>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SaleList from './components/SaleList'
import { getAllSale, createSale } from '../../network/sale'
import { getAllCustomer } from '../../network/purchase'
import { getMaxAmountCustomerOfSalesmanByTime } from "../../network/sale";
import { getAllCommodity } from '../../network/commodity'
import { formatDate } from "@/common/utils";
export default {
  name: 'SaleView',
  components: {
    Layout,
    Title,
    SaleList
  },
  data() {
    return {
      date: '',
      activeName: 'PENDING_LEVEL_1',
      saleList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      searchVisible: false,
      customerPurchaseAmount: {
          customerPO: {
            id: '',
            type: '',
            level: '',
            name: '',
            phone: '',
            address: '',
            zipcode: '',
            email: '',
            lineOfCredit: '',
            receivable: '',
            payable: '',
            operator: ''
          },
          totalFinalAmount: ''
      },
      saleForm: {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      sellers: [],
      salesman: '',
      rules: {
        supplier: [
          { required: true, message: '请选择一个销售商', trigger: 'change' }
        ],
        discount: [
          { required: true, message: '请输入折扣', trigger: 'change' }
        ],
        voucherAmount: [
          { required: true, message: '请输入代金券总额', trigger: 'change' }
        ],
      },
      commodityList: []
    }
  },
  mounted() {
    this.getSale()
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id }))
    })
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.sellers = _res.result
    })
  },
  computed: {
    beginDate: function(){
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function() {
      return this.date === '' ? '' : formatDate(this.date[1])
    }
  },
  methods: {
    getSale() {
      getAllSale({}).then(_res => {
        this.saleList = _res.result
        this.pendingLevel1List = this.saleList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.saleList.filter(item => item.state === '待二级审批')
        this.successList = this.saleList.filter(item => item.state === '审批完成')
        this.failureList = this.saleList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm()
          done();
        })
        .catch(_ => {});
    },
    handleClose2(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getData() {
      const config = {
        params: {
          salesman: this.salesman,
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      getMaxAmountCustomerOfSalesmanByTime(config).then(_res => {
        if (config.params.salesman === null || this.date === ''){
          this.$message.error('请正确输入!')
          this.resetMessage()
        }else {
          this.customerPurchaseAmount = _res.result
          if (this.customerPurchaseAmount === null) {
            this.$message.error('查询失败!')
            this.resetMessage()
          } else {
            this.$message.success('查询成功!')
            this.searchVisible = false
          }
        }
      })

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleForm.id = null
          this.saleForm.operator = sessionStorage.getItem("name")
          this.saleForm.salesman = sessionStorage.getItem("name")
          this.saleForm.state = null
          this.saleForm.rawTotalAmount = null
          this.saleForm.finalAmount = null
          this.saleForm.discount = Number(this.saleForm.discount)
          this.saleForm.voucherAmount = Number(this.saleForm.voucherAmount)
          this.saleForm.saleSheetContent.forEach((item) => {
            item.id = null
            item.purchaseSheetId = null
            item.quantity = parseInt(item.quantity)
            item.unitPrice = parseInt(item.unitPrice)
            item.totalPrice = item.quantity * item.unitPrice
          })
          createSale(this.saleForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getSale()
            }
          })
        }
      })
    },
    resetForm() {
      this.saleForm = {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      }
    },
    resetMessage(){
      this.salesman = ''
      this.date = ''
      this.customerPurchaseAmount = {
        customerPO: {
          id: '',
            type: '',
            level: '',
            name: '',
            phone: '',
            address: '',
            zipcode: '',
            email: '',
            lineOfCredit: '',
            receivable: '',
            payable: '',
            operator: ''
        },
        totalFinalAmount: ''
      }
    },
    addProduct() {
      this.saleForm.saleSheetContent.push({});
    },
    removeProduct(item) {
      var index = this.saleForm.saleSheetContent.indexOf(item)
      if (index !== -1) {
        this.saleForm.saleSheetContent.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
.mt15 {
  margin-top: 15px;
}
</style>