<template>
  <div class="card">
    <el-card v-for="(item) in list" :key="item.sheet_number" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{item.sheet_number}}</span>
            <el-button v-if="authorization() === 1" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item.sheet_number)"></el-button>
            <el-button v-if="authorization() === 1"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.sheet_number)"></el-button>
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
                       type="primary" icon="el-icon-check" circle size="mini" @click="approval(item.sheet_number)"></el-button>
            <el-button v-if="authorization() === 2"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.sheet_number)"></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 3" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 4" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="5">
            <span><strong>员工编号: </strong>{{item.id}}</span>
          </el-col>
          <el-col :span="5">
            <span><strong>姓名: </strong>{{item.name}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>岗位: </strong>{{item.role}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>银行卡号: </strong>{{item.account_number}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="7">
            <span><strong>应发工资: </strong>{{item.should_pay}}</span>
          </el-col>
          <el-col :span="7">
            <span><strong>扣除税款: </strong>{{item.tax}}</span>
          </el-col>
          <el-col :span="7">
            <span><strong>实发金额: </strong>{{item.actual_pay}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { firstApproval, secondApproval} from '../../../network/staff'
export default {
  name: 'SalaryList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
  },
  methods: {
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index])
    },
    authorization() {
      if (this.type === 1 && sessionStorage.getItem('role') === 'HR') {
        return 1
      } else if (this.type === 2 && sessionStorage.getItem('role') === 'GM') {
        return 2
      }
    },
    approval(sheet_number) {
      let config = {
        params: {
          sheet_number: sheet_number,
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      if (this.type === 1) {
        firstApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        secondApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    },
    deny(sheet_number) {
      let config = {
        params: {
          sheet_number: sheet_number,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        firstApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        secondApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>