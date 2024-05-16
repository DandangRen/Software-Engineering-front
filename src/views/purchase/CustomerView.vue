<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="addCustomer">新增客户</el-button>
    <div style="margin-top: 10px">
      <el-table
        :data="customerList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '供应商' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="zipcode"
          label="邮编"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="lineOfCredit"
          label="应收额度(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="receivable"
          label="应收(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="payable"
          label="应付(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
          width="120">
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
              @click="deleteCustomer(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title = "新增客户"
      :visible.sync="addDialogVisible"
      width = "30%"
      @close = "close()">   <!--  close函数尚未完成    -->
      <el-form :model="addForm" :label-width="'100px'" size = "mini">
        <el-form-item label = "所属分类">
          <el-select v-model="addForm.type">
            <el-option
                v-for = "item in classificationList"
                :label = "item"
                :key = "item"
                :value = "item">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label ="级别">
          <el-select v-model="addForm.level">
            <el-option
              v-for = "item in levelList"
              :key = "item"
              :label = "item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label = "姓名">
          <el-input v-model="addForm.name" placeholder = "请输入客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addForm.phone" placeholder = "请输入电话" ></el-input>
        </el-form-item>
        <el-form-item label = "地址">
          <el-input v-model="addForm.address" placeholder = "请输入地址"></el-input>
        </el-form-item>
        <el-form-item label = "邮编">
          <el-input v-model="addForm.zipcode" placeholder = "请输入邮编"></el-input>
        </el-form-item>
        <el-form-item label = "邮箱">
          <el-input v-model="addForm.email" placeholder = "请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label = "操作员">        <!-- 不知道这里要不要修改-->
          <el-input v-model="addForm.operator" placeholder = "请输入操作员"></el-input>
        </el-form-item>
      </el-form>
      <div slot = "footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title = "编辑客户信息"
        :visible.sync="editDialogVisible"
        width = "30%"
        @close = "close()">
      <el-form :model="editForm" :label-width="'100px'" size = "mini">
        <el-form-item label = "所属分类">
          <el-select v-model="editForm.type">
            <el-option
                v-for = "item in classificationList"
                :label = "item"
                :key = "item"
                :value = "item">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label ="级别">
          <el-select v-model="editForm.level">
            <el-option
                v-for = "item in levelList"
                :key = "item"
                :label = "item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label = "姓名">
          <el-input v-model="editForm.name" placeholder = "请输入客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.phone" placeholder = "请输入电话" ></el-input>
        </el-form-item>
        <el-form-item label = "地址">
          <el-input v-model="editForm.address" placeholder = "请输入地址"></el-input>
        </el-form-item>
        <el-form-item label = "邮编">
          <el-input v-model="editForm.zipcode" placeholder = "请输入邮编"></el-input>
        </el-form-item>
        <el-form-item label = "邮箱">
          <el-input v-model="editForm.email" placeholder = "请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label = "操作员">        <!-- 不知道这里要不要修改-->
          <el-input v-model="editForm.operator" placeholder = "请输入操作员"></el-input>
        </el-form-item>
        <el-form-item label = "应收额度">
          <el-input v-model="editForm.lineOfCredit" ></el-input>
        </el-form-item>
        <el-form-item label = "应收">
          <el-input v-model="editForm.receivable" ></el-input>
        </el-form-item>
        <el-form-item label = "应付">
          <el-input v-model="editForm.payable" ></el-input>
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
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getAllCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer
} from "../../network/purchase";
export default {
  name: 'CustomerView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      customerList: [],
      editDialogVisible:false,
      addDialogVisible:false,
      addForm:{
        id:'',
        type:'',
        level: '',
        name: '',
        phone: '',
        address: '',
        zipcode: '',
        email: '',
        operator: '',
        receivable:'',
        payable:'',
        lineOfCredit:''
      },
      editForm:{
        id:'',
        type:'',
        level: '',
        name: '',
        phone: '',
        address: '',
        zipcode: '',
        email: '',
        operator: '',
        receivable:'',
        payable:'',
        lineOfCredit:''
      },
      classificationList:[
        "供应商",
        "销售商"
      ],
      levelList:[
          1,
          2,
          3,
          4,
          5
      ]
    }
  },
  async mounted() {
    this.getAll();
  },
  methods: {
    getAll(){
      this.customerList = [];
      getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
        this.customerList = this.customerList.concat(_res.result)
      })
      getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
        this.customerList = this.customerList.concat(_res.result)
      })
    },
    filterTag(value, row) {
      return row.type === value
    },
    addCustomer() {

      this.addDialogVisible = true;
    },
    editInfo(id) {
      this.editForm = this.customerList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    },
    deleteCustomer(id){

      let config={
        params:{
          id:id
        }
      }
      this.$confirm('是否删除该客户','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=> {
        console.log(config)
        deleteCustomer(config).then(_res => {
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
      }else if(type === true){
        updateCustomer(this.editForm).then(_res =>{
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
        this.addForm.id = 1;
        this.addForm.payable = 0;
        this.addForm.receivable = 0;
        this.addForm.lineOfCredit = 0;
        console.log(this.addForm);
        createCustomer(this.addForm).then(_res =>{
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
</script>

<style>

</style>