<template>
  <Layout>
    <Title title="账户管理"></Title>
    <el-tabs type="border-card">
      <el-tab-pane label="根据关键词模糊查询">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择查询属性" class="el-select">
              <el-option label="卡号" value="1"></el-option>
              <el-option label="账号" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getAlmostAccount(input)"></el-button>
          </el-input>
        </div>
        <div style="margin-top: 10px">
          <el-table
            :data="searchList"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column
              prop="number"
              label="卡号"
              width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="账号"
              width="300">
            </el-table-column>
            <el-table-column
              prop="balance"
              label="余额"
              width="300">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="editInfo(scope.row.number)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click="deleteAccount(scope.row.number)"
                  type="text"
                  size="small">
                  删除
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全部账户">
        <el-button type="primary" size="medium" @click="addAccount">新增账户</el-button>
        <div style="margin-top: 10px">
          <el-table
            :data="accountList"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column
              prop="number"
              label="卡号"
              width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="账号"
              width="300">
            </el-table-column>
            <el-table-column
              prop="balance"
              label="余额"
              width="300">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="editInfo(scope.row.number)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click="deleteAccount(scope.row.number)"
                  type="text"
                  size="small">
                  删除
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title = "新增账户"
      :visible.sync="addDialogVisible"
      width = "30%"
      @close = "close()">
      <el-form :model="addForm" :label-width="'100px'" size = "mini">
        <el-form-item label = "卡号">
          <el-input v-model="addForm.number" placeholder="请输入卡号"></el-input>
        </el-form-item>
        <el-form-item label = "账号">
          <el-input v-model="addForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label = "余额">
          <el-input v-model="addForm.balance" placeholder="请输入账户余额"></el-input>
        </el-form-item>
      </el-form>
      <div slot = "footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title = "编辑账户信息"
      :visible.sync="editDialogVisible"
      width = "30%"
      @close = "close()">
      <el-form :model="editForm" :label-width="'100px'" size = "mini">
        <el-form-item label = "账户名称">
          <el-input v-model="editForm.name" placeholder="请修改账户名称"></el-input>
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
import { addAccount, deleteAccount, getAccount, updateAccount, getAll, getByNumber, getByName } from "../../network/account";
export default {
  components: { Layout, Title},
  name: "BankAccountView",
  data() {
    return {
      accountList: [],
      searchList: [],
      editDialogVisible:false,
      addDialogVisible:false,
      addForm:{
        number: '',
        name: '',
        balance: 0
      },
      editForm:{
        number: '',
        name: '',
        balance: ''
      },
      input: '',
      select: ''
    }
  },
  async mounted() {
    this.getAll();
  },
  methods: {
    getAll(){
      this.accountList = [];
      getAll({}).then(_res => {
        this.accountList = this.accountList.concat(_res.result)
      })
    },
    filterTag(value, row) {
      return row.type === value
    },
    addAccount() {
      this.addDialogVisible = true;
    },
    editInfo(number) {
      this.editForm = this.accountList.filter(x => x.number === number)[0];
      this.editDialogVisible = true;
    },
    getAlmostAccount(input){
      this.searchList = []
      if (this.select === ''){
        this.$message.warning("请选择查询属性！")
        this.searchList = []
      } else if (this.select === '1') {
        const config = {
          params: {
            number: input
          }
        }
        console.log(config)
        getByNumber(config).then(_res => {
          this.searchList = this.searchList.concat(_res.result)
        })
      } else if (this.select === '2'){
        const config = {
          params: {
            name: input
          }
        }
        console.log(config)
        getByName(config).then(_res => {
          this.searchList = this.searchList.concat(_res.result)
        })
      }
      this.input = ''
    },
    deleteAccount(number){
      const config={
        params:{
          number: number
        }
      }
      this.$confirm('是否删除该账户','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        console.log(config)
        deleteAccount(config).then(_res => {
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
        updateAccount(this.editForm).then(_res =>{
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
        for (var i = 0; i < this.accountList.length; i++) {
          if (this.addForm.number === this.accountList[i].number){
            x = true;
          }
        }
        if (x) {
          this.$message.error("账户已存在!")
          this.addForm = {};
          this.addDialogVisible = false;
          this.getAll();
        }else {
          addAccount(this.addForm).then(_res => {
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