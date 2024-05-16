<template>
  <Layout>
    <Title title="员工打卡"></Title>
    <el-button type="primary" size="medium" @click="addStaffClock">新增签到记录</el-button>
    <el-button type="primary" size="medium" @click="clean">每月清零初始化</el-button>
    <div style="margin-top: 10px">
      <el-table
        :data="clockList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="today"
          label="当日日期"
          width="250">
        </el-table-column>
        <el-table-column
          prop="clock_in_count"
          label="每月打卡次数"
          width="250">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editInfo(scope.row.id)"
              type="text"
              size="small">
              打卡
            </el-button>
            <el-button
                @click="deleteClock(scope.row.id)"
                type="text"
                size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title = "新增签到记录"
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
        <el-form-item label = "当日日期">
          <el-input v-model="addForm.today" placeholder="请输入当日日期"></el-input>
        </el-form-item>
        <el-form-item label = "每月打卡次数">
          <el-input v-model="addForm.clock_in_count" placeholder="请输入每月打卡次数"></el-input>
        </el-form-item>
      </el-form>
      <div slot = "footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "../../components/content/Layout";
import Title from "@/components/content/Title";
import {
  addStaffClock,
  cleanStaffClock,
  StaffClockIn,
  Clock_getAll,
  deleteStaff,
  deleteClock
} from "../../network/staff";
export default {
  components: { Layout, Title},
  name: "StaffClockView",
  data() {
    return {
      clockList: [],
      searchList: [],
      editDialogVisible:false,
      addDialogVisible:false,
      addForm:{
        id: '',
        name: '',
        today: '',
        clock_in_count: ''
      },
      editForm:{
        id: '',
        name: '',
        today: '',
        clock_in_count: ''
      },

    }
  },
  async mounted() {
    this.getAll();
  },
  methods: {
    getAll(){
      this.clockList = [];
      Clock_getAll({}).then(_res => {
        this.clockList = this.clockList.concat(_res.result)
      })
    },
    filterTag(value, row) {
      return row.type === value
    },
    addStaffClock() {
      this.addDialogVisible = true;
    },
    editInfo(id) {
      this.editForm = this.clockList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
      this.handleEdit(true)
    },
    clean(){
      cleanStaffClock().then(_res =>{
        this.$message({
          type: 'success',
          message: '清零成功!'
        });
        this.getAll()
      })
    },
    deleteClock(id){
      const config={
        params:{
          id: id
        }
      }
      this.$confirm('是否删除该记录','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        console.log(config)
        deleteClock(config).then(_res => {
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
        StaffClockIn(this.editForm).then(_res =>{
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
        for (var i = 0; i < this.clockList.length; i++) {
          if (this.addForm.id === this.clockList[i].id){
            x = true;
          }
        }
        if (x) {
          this.$message.error("记录已存在!")
          this.addForm = {};
          this.addDialogVisible = false;
          this.getAll();
        }else {
          console.log(this.addFrom)
          addStaffClock(this.addForm).then(_res => {
            this.$message({
              type: 'success',
              message: '新增成功!'
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