<template>
  <Layout>
    <Title title="付款管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定付款单</el-button>

    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="草稿" name="DRAFT">
          <div v-if="draftList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="draftList" :type="1" @refresh="getPayable()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="pendingList" :type="2" @refresh="getPayable()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      title="创建付款单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="payableForm" label-width="100px" ref="payableForm" :rules="rules">
          <el-form-item label="客户: " prop="customer">
            <el-select v-model="payableForm.customer" placeholder="请选择客户">
              <el-option
                v-for="item in customers"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(item, index) in payableForm.payableSheetContent"
            :key="index"
            :label="'发票' + index">
            <div>
              <el-input v-model="item.bankNumber" style="width: 35%; margin-right: 5%" placeholder="请输入银行账号"></el-input>
              <el-input v-model="item.transferAmount" style="width: 35%;" placeholder="请输入转账金额"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-input v-model="item.remark" style="width: 75%; margin-right: 10%" placeholder="请填写备注"></el-input>
              <el-button type="text" size="small" @click="addContent" v-if="index === payableForm.payableSheetContent.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeContent(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('payableForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "../../components/content/Layout";
import Title from "@/components/content/Title";
import PayableList from "./components/PayableList";
import { getAllCustomer } from "../../network/purchase";
import { createPayable, getAllPayable } from "../../network/finance";
export default {
  name: 'PayableView',
  components: { Layout, Title, PayableList },
  data() {
    return {
      activeName: 'DRAFT',
      payableList: [],
      draftList: [],
      pendingList: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      customers: [],
      payableForm: {
        payableSheetContent: [
          {
            bankNumber: '',
            transferAmount: '',
            remark: ''
          }
        ]
      },
      rules: {
        customer: [
          { required: true, message: '请选择一个客户', trigger: 'change' }
        ],
      },
    }
  },
  mounted() {
    this.getPayable()
    getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customers = this.customers.concat(_res.result)
    })
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customers = this.customers.concat(_res.result)
    })
  },
  computed: {

  },
  methods: {
    getPayable(){
      getAllPayable({}).then(_res => {
        this.payableList = _res.result
        this.draftList = this.payableList.filter(item => item.state === '草稿')
        this.pendingList = this.payableList.filter(item => item.state === '待审批')
        this.successList = this.payableList.filter(item => item.state === '审批完成')
        this.failureList = this.payableList.filter(item => item.state === '审批失败')
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.payableForm.id = null
          this.payableForm.operator = sessionStorage.getItem("name")
          this.payableForm.state = null
          this.payableForm.totalAmount = null
          this.payableForm.payableSheetContent.forEach((item) => {
            item.id = null
            item.payableSheetId = null
            item.bankName = item.bankNumber
            item.transferAmount = parseInt(item.transferAmount)
          })
          createPayable(this.payableForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getPayable()
            }
          })
        }
      })
    },
    resetForm() {
      this.payableForm = {
        payableSheetContent: [
          {
            bankNumber: '',
            transferAmount: '',
            remark: ''
          }
        ]
      }
    },
    addContent() {
      this.payableForm.payableSheetContent.push({});
    },
    removeContent(item) {
      var index = this.payableForm.payableSheetContent.indexOf(item)
      if (index !== -1) {
        this.payableForm.payableSheetContent.splice(index, 1)
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