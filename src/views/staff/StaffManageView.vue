<template>
  <Layout>
    <Title title="员工管理"></Title>
    <el-button type="primary" size="medium" @click="addStaff">员工入职</el-button>
    <div style="margin-top: 10px">
      <el-table
        :data="staffList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="phone_number"
          label="手机"
          width="100">
        </el-table-column>
        <el-table-column
          prop="role"
          label="工作岗位"
          width="100">
        </el-table-column>
        <el-table-column
          prop="basic_salary"
          label="基本工资"
          width="100">
        </el-table-column>
        <el-table-column
          prop="post_salary"
          label="岗位工资"
          width="100">
        </el-table-column>
        <el-table-column
          prop="post_level"
          label="岗位级别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="post_level"
          label="岗位级别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="salary_count_way"
          label="薪资计算方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="salary_method"
          label="薪资发放方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="bank_account"
          label="工资卡账户号"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editInfo(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="deleteStaff(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title = "员工入职"
      :visible.sync="addDialogVisible"
      width = "30%"
      @close = "close()">
      <el-form :model="addForm" :label-width="'100px'" size = "mini">
        <el-form-item label = "编号">
          <el-input v-model="addForm.id" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label = "姓名">
          <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label = "性别">
          <el-radio v-model="addForm.gender" label="男">男</el-radio>
          <el-radio v-model="addForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label = "出生日期">
          <el-input v-model="addForm.birthday" placeholder="请输入出生日期"></el-input>
        </el-form-item>
        <el-form-item label = "手机">
          <el-input v-model="addForm.phone_number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label = "工作岗位">
          <el-select v-model="addForm.role" placeholder="请选择工作岗位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label = "基本工资">
          <el-input v-model="addForm.basic_salary" placeholder="请输入基本工资"></el-input>
        </el-form-item>
        <el-form-item label = "岗位工资">
          <el-input v-model="addForm.post_salary" placeholder="请输入岗位工资"></el-input>
        </el-form-item>
        <el-form-item label = "岗位级别">
          <el-input v-model="addForm.post_level" placeholder="请输入岗位级别"></el-input>
        </el-form-item>
        <el-form-item label = "薪资计算方式">
          <el-input v-model="addForm.salary_count_way" placeholder="请输入薪资计算方式"></el-input>
        </el-form-item>
        <el-form-item label = "薪资发放方式">
          <el-input v-model="addForm.salary_method" placeholder="请输入薪资发放方式"></el-input>
        </el-form-item>
        <el-form-item label = "工资卡账户号">
          <el-input v-model="addForm.bank_account" placeholder="请输入工资卡账户号"></el-input>
        </el-form-item>
      </el-form>
      <div slot = "footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title = "编辑员工信息"
      :visible.sync="editDialogVisible"
      width = "30%"
      @close = "close()">
      <el-form :model="editForm" :label-width="'100px'" size = "mini">
        <el-form-item label = "姓名">
          <el-input v-model="editForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label = "性别">
          <el-radio v-model="editForm.gender" label="男">男</el-radio>
          <el-radio v-model="editForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label = "出生日期">
          <el-input v-model="editForm.birthday" placeholder="请输入出生日期"></el-input>
        </el-form-item>
        <el-form-item label = "手机">
          <el-input v-model="editForm.phone_number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label = "工作岗位">
          <el-select v-model="editForm.role" placeholder="请选择工作岗位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label = "基本工资">
          <el-input v-model="editForm.basic_salary" placeholder="请输入基本工资"></el-input>
        </el-form-item>
        <el-form-item label = "岗位工资">
          <el-input v-model="editForm.post_salary" placeholder="请输入岗位工资"></el-input>
        </el-form-item>
        <el-form-item label = "岗位级别">
          <el-input v-model="editForm.post_level" placeholder="请输入岗位级别"></el-input>
        </el-form-item>
        <el-form-item label = "薪资计算方式">
          <el-input v-model="editForm.salary_count_way" placeholder="请输入薪资计算方式"></el-input>
        </el-form-item>
        <el-form-item label = "薪资发放方式">
          <el-input v-model="editForm.salary_method" placeholder="请输入薪资发放方式"></el-input>
        </el-form-item>
        <el-form-item label = "工资卡账户号">
          <el-input v-model="editForm.bank_account" placeholder="请输入工资卡账户号"></el-input>
        </el-form-item>
      </el-form>
      <div slot = "footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取消</el-button>
        <el-button type="primary" @click="handleEdit(true)">确定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "../../components/content/Layout";
import Title from "@/components/content/Title";
import { addStaff, deleteStaff, updateStaff, getAll } from "../../network/staff";
export default {
  components: { Layout, Title},
  name: "StaffView",
  data() {
    return {
      staffList: [],
      searchList: [],
      editDialogVisible:false,
      addDialogVisible:false,
      addForm:{
        id: '',
        name: '',
        gender: '',
        birthday: '',
        phone_number: '',
        role: '',
        basic_salary: '',
        post_salary: '',
        post_level: '',
        salary_count_way: '',
        salary_method: '',
        bank_account: ''
      },
      editForm:{
        id: '',
        name: '',
        gender: '',
        birthday: '',
        phone_number: '',
        role: '',
        basic_salary: '',
        post_salary: '',
        post_level: '',
        salary_count_way: '',
        salary_method: '',
        bank_account: ''
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
  async mounted() {
    this.getAll();
  },
  methods: {
    getAll(){
      this.staffList = [];
      getAll({}).then(_res => {
        this.staffList = this.staffList.concat(_res.result)
      })
    },
    filterTag(value, row) {
      return row.type === value
    },
    addStaff() {
      this.addDialogVisible = true;
    },
    editInfo(id) {
      this.editForm = this.staffList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    },
    deleteStaff(id){
      const config={
        params:{
          id: id
        }
      }
      this.$confirm('是否删除该员工','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        console.log(config)
        deleteStaff(config).then(_res => {
          if (_res.msg === 'Success') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getAll();
          }
        })
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    },
    handleEdit(type){
      if(type === false){
        this.editDialogVisible = false;
        this.editForm = {};
        this.getAll();
      }else if(type === true){
        this.editForm.basic_salary = parseInt(this.editForm.basic_salary)
        this.editForm.post_salary = parseInt(this.editForm.post_salary)
        updateStaff(this.editForm).then(_res =>{
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.editForm = {};
          this.editDialogVisible = false;
          this.getAll();
        })
      }
    },
    close() { //TODO close()函数尚有bug
      this.addForm = {};
      this.editForm = {};
    },
    handleAdd(type){
      if(type === false){
        this.addDialogVisible = false;
        this.addFrom = {};
      }else if(type ===true){
        var x = false;
        for (var i = 0; i < this.staffList.length; i++) {
          if (this.addForm.id === this.staffList[i].id){
            x = true;
          }
        }
        if (x) {
          this.$message.error("员工已存在!")
          this.addForm = {};
          this.addDialogVisible = false;
          this.getAll();
        }else {
          this.addForm.basic_salary = parseInt(this.addForm.basic_salary)
          this.addForm.post_salary = parseInt(this.addForm.post_salary)
          console.log(this.addFrom)
          addStaff(this.addForm).then(_res => {
            this.$message({
              type: 'success',
              message: '入职成功!'
            });
            this.addForm = {};
            this.addDialogVisible = false;
            this.getAll();
          })
        }
      }
    }
  }
};
</script>

<style scoped>
.el-select{
  width: 170px;
  background: #ffffff;
}
.input-with-select{
  background-color: #e8eaf6;
}
</style>