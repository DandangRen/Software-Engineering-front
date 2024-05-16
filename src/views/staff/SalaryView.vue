<template>
  <Layout>
    <Title title="工资管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定工资单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="pendingLevel1List" :type="1" @refresh="getSalary()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="pendingLevel2List" :type="2" @refresh="getSalary()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      title="创建工资单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="salaryForm" label-width="100px" ref="salaryForm">
          <el-form-item label="单据编号: " prop="sheet_number">
            <el-input v-model="salaryForm.sheet_number"></el-input>
          </el-form-item>
          <el-form-item label="员工编号: " prop="id">
            <el-input v-model="salaryForm.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名: " prop="name">
            <el-input v-model="salaryForm.name"></el-input>
          </el-form-item>
          <el-form-item label="岗位: " prop="role">
            <el-select v-model="salaryForm.role" placeholder="请选择工作岗位">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号: " prop="account_number">
            <el-input v-model="salaryForm.account_number"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('salaryForm')">立即创建</el-button>
      </span>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SalaryList from "./components/SalaryList";
import { formatDate } from "@/common/utils";
import { getAllSalary, createSalary} from "../../network/staff";
export default {
  name: 'SalaryView',
  components: {
    Layout,
    Title,
    SalaryList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      salaryList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      searchVisible: false,
      salaryForm: {
        sheet_number: '',
        id: '',
        name: '',
        role: '',
        account_number: ''
      },
      options: [{
        value: 'INVENTORY_MANAGER',
        label: '库存管理人员'
      }, {
        value: 'SALE_STAFF',
        label: '进货销售人员'
      }, {
        value: 'SALE_MANAGER',
        label: '销售经理'
      }, {
        value: 'FINANCIAL_STAFF',
        label: '财务人员'
      }, {
        value: 'HR',
        label: '人力资源人员'
      }, {
        value: 'GM',
        label: '总经理'
      }],
    }
  },
  mounted() {
    this.getSalary()
  },
  computed: {
  },
  methods: {
    getSalary() {
      getAllSalary({}).then(_res => {
        this.salaryList = _res.result
        this.pendingLevel1List = this.salaryList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.salaryList.filter(item => item.state === '待二级审批')
        this.successList = this.salaryList.filter(item => item.state === '审批完成')
        this.failureList = this.salaryList.filter(item => item.state === '审批失败')
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
          this.salaryForm.state = null
          createSalary(this.salaryForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getSalary()
            }
          })
        }
      })
    },
    resetForm() {
      this.salaryForm = {}
    },

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